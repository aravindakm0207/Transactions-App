const Product = require('../models/products');
const axios = require('axios');
const productCltr = {};

productCltr.seedData = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;
        await Product.insertMany(products);
        console.log('Data seeded successfully!');
        res.json({ message: 'Data seeded successfully!' });
    } catch (err) {
        console.error('Error seeding data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


productCltr.listAllProducts = async (req, res) => {
    try {
        const products = await Product.find();  
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


productCltr.listTransactions = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const month = req.query.month ? parseInt(req.query.month) : null;        
        const searchQuery = {
            $and: [
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } }
                    ]
                }
            ]
        };
  
        if (month) {
            searchQuery.$and.push({
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, month] 
                }
            });
        }
      
        if (!isNaN(search) && search.trim() !== "") {
            searchQuery.$and[0].$or.push({ price: parseFloat(search) });
        }
     
        const products = await Product.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(limit); 
        const total = await Product.countDocuments(searchQuery);        
        res.json({
            data: products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


productCltr.getStatistics = async (req, res) => {
    try {
        const month = parseInt(req.query.month);       
        const products = await Product.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]  
            }
        });

        console.log(`Products found for month ${month}: ${products.length}`, products);      
        const totalSaleAmount = products.reduce((acc, product) => acc + (product.sold ? product.price : 0), 0);
        const totalSoldItems = products.filter(product => product.sold).length;
        const totalNotSoldItems = products.length - totalSoldItems;
        
        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (err) {
        console.error('Error fetching statistics:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

productCltr.getBarChart = async (req, res) => {
    try {
        const month = parseInt(req.query.month);  
        const products = await Product.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]  
            }
        });

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        products.forEach(product => {
            const price = product.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        }); 
        console.log("Price Range Data:", priceRanges); 
        res.json(priceRanges);
    } catch (err) {
        console.error('Error generating bar chart data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

productCltr.getPieChart = async (req, res) => {
    try {
        const month = parseInt(req.query.month); 
        const products = await Product.find({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, month]  
            }
        });
        const categories = {};     
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = 0;
            }
            categories[product.category]++;
        });
        return categories;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


productCltr.getCombinedData = async (req, res) => {
    try {
        const [statistics, barChart, pieChart] = await Promise.all([
            productCltr.getStatistics(req, res),
            productCltr.getBarChart(req, res),
            productCltr.getPieChart(req, res)
        ]);
        res.json({
            statistics,
            barChart,
            pieChart
        });
    } catch (err) {
        console.error('Error fetching combined data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = productCltr;
