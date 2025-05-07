const express = require('express');
const mongoose = require('mongoose');
const  Site = require('./models/Site');
const Kiosk = require('./models/Kiosk');
const monthlyData = require('./models/Monthly');
const DispenserRecords = require('./models/Item1');
const cors = require('cors'); // Import the cors module
const app = express();
const port = 5000;
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
const os = require('os'); // Import os module to get user directories
const { ObjectId, DBRef } = require('mongodb');
const Monthly = require('./models/Monthly');
const PORT = process.env.PORT || 3001;
dotenv.config();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB:', err));
// Fetch the Site data


//const Site = mongoose.model('Site', siteSchema);

// API Endpoint to Get All Sites
app.get('/api/atmLocations', async (req, res) => {
  try {
    // Query the database for all sites
    //const sites = await Site.find({}); // Fetch only 'name' and 'locationCoordinates'
    const sites = await Site.find({
      locationCoordinates: { $ne: null }, // Ensure the field is not null
      "locationCoordinates.0": { $ne: null }, // Ensure longitude is not null
      "locationCoordinates.1": { $ne: null }  // Ensure latitude is not null
    }, 'name locationCoordinates');
    
    console.log("site= ", sites);
        // Map the required fields
    const siteDetails = sites.map(site => {
      if (site.locationCoordinates && site.locationCoordinates.length === 2) {
        return {
          name: site.name,
          latitude: site.locationCoordinates[1],
          longitude: site.locationCoordinates[0],
        };
      } else {
        return { name: site.name, latitude: null, longitude: null };
      }
    });

    // Send the results as JSON
    res.status(200).json(siteDetails);
  } catch (error) {
    console.error('Error retrieving site data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/test', async (req, res) => {
    try {
        res.send("hello");    }
    catch(error)
    {
        return error;
    }
});


/*
// Fetch all sites with name and coordinates
async function getAllSites() {
    try {
      // Query the database for all sites
      const sites = await Site.find({}, 'name locationCoordinates'); // Select only 'name' and 'locationCoordinates'
  
      // Map the required fields
      const siteDetails = sites.map(site => {
        if (site.locationCoordinates && site.locationCoordinates.length === 2) {
          return {
            name: site.name,
            latitude: site.locationCoordinates[1],
            longitude: site.locationCoordinates[0],
          };
        } else {
          return { name: site.name, latitude: null, longitude: null }; // Handle missing or invalid coordinates
        }
      });
  
      // Display the results
      console.log('Site Details:', siteDetails);
      return siteDetails; // Return the details if needed elsewhere
    } catch (error) {
      console.error('Error retrieving site data:', error);
    }
  } 
  // Call the function to get all site locations
  getAllSites();
*/
  
const impactMetrics = [
  {
    "id": 1,
    "date": "2025-01-01",
    "region": "North India",
    "totalWaterDispensed": 50000,
    "totalUsers": 1200,
    "healthImpact": {
      "diseasesReduced": 50,
      "improvedHealthConditions": 300,
      "waterborneDiseasesPrevented": 150
    },
    "educationImpact": {
      "studentsImpacted": 800,
      "schoolsBenefited": 15
    },
    "climateImpact": {
      "waterSaved": 25000,
      "carbonFootprintReduced": 10
    }
  },
  {
    "id": 2,
    "date": "2025-01-02",
    "region": "South India",
    "totalWaterDispensed": 60000,
    "totalUsers": 1400,
    "healthImpact": {
      "diseasesReduced": 60,
      "improvedHealthConditions": 350,
      "waterborneDiseasesPrevented": 180
    },
    "educationImpact": {
      "studentsImpacted": 900,
      "schoolsBenefited": 20
    },
    "climateImpact": {
      "waterSaved": 30000,
      "carbonFootprintReduced": 12
    }
  }
];

app.get('/api/impactMetrics', (req, res) => {
  res.json(impactMetrics);
});

/*
// Dummy ATM locations data
const atmLocations = [
    { lat: 28.7041, lng: 77.1025, locationName: "Delhi, India" },
    { lat: 19.0760, lng: 72.8777, locationName: "Mumbai, India" },
    { lat: 13.0827, lng: 80.2707, locationName: "Chennai, India" },
    { lat: 22.5726, lng: 88.3639, locationName: "Kolkata, India" },
    { lat: 12.9716, lng: 77.5946, locationName: "Bangalore, India" },
    { lat: 25.5941, lng: 85.1376, locationName: "Patna, India" },
    { lat: 19.3132, lng: 84.7915, locationName: "Bhubaneswar, India" }
  ];
  
  // Define the endpoint to fetch ATM locations
  app.get('/api/atmLocations', (req, res) => {
    res.json(atmLocations);
  });
  */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// API Routes
app.get("/api/kiosks", async (req, res) => {
  try {
    const kiosks = await Kiosk.find();
    res.json(kiosks);
  } catch (err) {
    res.status(500).send("Error fetching kiosks");
  }
});

// Populate MongoDB with sample data
const sampleData = [
  { name: "Kiosk 1", latitude: 28.6139, longitude: 77.209, status: "Operational", ph: 7.1, tds: 250 },
  { name: "Kiosk 2", latitude: 19.076, longitude: 72.8777, status: "Maintenance Required", ph: 6.9, tds: 300 },
  { name: "Kiosk 3", latitude: 13.0827, longitude: 80.2707, status: "Non-Operational", ph: 8.0, tds: 500 },
];

Kiosk.insertMany(sampleData)
  .then(() => console.log("Sample data inserted"))
  .catch((err) => console.error(err));
























//new code


const MasterSiteSchema = new mongoose.Schema({
  name: String,
  childSites: [
    {
      $ref: String,
      $id: {
        $oid : mongoose.Schema.Types.ObjectId
      }
    },
  ],
  dailyDataAvailableFrom: String,
  dailyDataAvailableUpto: String,
  _class: String,
});
const MasterSite = mongoose.model("Master_Sites", MasterSiteSchema);
console.log("master=",MasterSite);

app.get('/api/getMastersiteId', async(req,res)=>{
    console.log("entered api/getMastersiteId/");

    const { name } = req.query;
    console.log("name received=", {name});
  if (!name) {
    return res.status(400).json({ error: "Master site name is required" });
  }

  try {
    const masterSite = await MasterSite.findOne({ name });
    if (!masterSite) {
      return res.status(404).json({ error: "Master site not found" });
    }

    res.json({ masterSiteId: masterSite._id });
  } catch (error) {
    console.error("Error fetching master site:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/api/mastersites', async(req,res)=>{
    try{
        console.log("enterd into /api/mastersites")
        // Fetch MasterSite and extract child site IDs
        const masterSiteReceived = await MasterSite.distinct("name");
        console.log("master site= ", masterSiteReceived);
        res.send(masterSiteReceived);
        //const masterSite = await MasterSite.findByI
    }
    catch(error){
        console.error('Error generating Excel:', error);
    }
});

//Get all mastersite name and id
// API to fetch all MasterSite IDs and names
app.get("/api/mastersitesnameid", async (req, res) => {
    try {
      const masterSites = await MasterSite.find({}, { _id: 1, name: 1 });
      const formattedSites = masterSites.map((site) => ({
        id: site._id,
        name: site.name,
      }));
      res.json(formattedSites);
    } catch (error) {
      console.error("Error fetching MasterSites:", error);
      res.status(500).send("Error fetching MasterSites");
    }
  });


// GET: Generate Excel with data for the given date range
app.get('/api/generateExcel', async (req, res) => {
    try {
       
        const { masterSiteId, startMonth, startYear, endMonth, endYear } = req.query;
        console.log("in here",masterSiteId, startMonth, startYear, endMonth, endYear );
        if (!masterSiteId || !startMonth || !startYear || !endMonth || !endYear) {
            return res.status(400).json({ message: 'Missing required query parameters.' });
        }

        // Generate month/year combinations in the range
        const dateRange = generateDateRange(startMonth, startYear, endMonth, endYear);
        console.log('Date Range:', dateRange);

        // Fetch MasterSite and extract child site IDs
        const masterSite = await MasterSite.findById(masterSiteId).lean();
        console.log("master site= ", masterSite);
        //const masterSite = await MasterSite.findById(masterSiteId).lean();
        
        const childSiteIds = masterSite.childSites.map((child) => {
            if (child instanceof DBRef) {
                console.log("in here1");
              return child.oid.toString();
            }
            if (child?.$id?.$oid) {          
              return new ObjectId(child.$id.$oid);
            }
            return null;
          }).filter(Boolean);
        console.log("Extracted childSiteIds:", childSiteIds);
        if (childSiteIds.length === 0) {
          return res.status(400).json({ message: "No valid child site IDs found." });
        }
    

        console.log('Child Site IDs:', childSiteIds);
        // MongoDB Aggregation
        const records = await DispenserRecords.aggregate([
            {
                $addFields: {
                    adjustedWaterDispensed: {
                        $cond: {
                            if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                            then: { $divide: ['$totalWaterDispensed', 1000] },
                            else: '$totalWaterDispensed',
                        },
                    },
                },
            },
            {
                $match: {
                    siteId: { $in: childSiteIds },
                    recordType: 'MONTHLY',
                    date: { $in: dateRange },
                },
            },
            {
                $group: {
                    _id: { siteId: '$siteId', siteName: '$site', date: '$date' },
                    totalWaterDispensed: { $sum: { $toDouble: '$adjustedWaterDispensed' } },
                    totalAmountCollected: { $sum: { $toDouble: '$totalAmountCollected' } },
                },
            },
            {
                $group: {
                    _id: { siteId: '$_id.siteId', siteName: '$_id.siteName' },
                    monthlyData: {
                        $push: {
                            month: '$_id.date',
                            totalWaterDispensed: '$totalWaterDispensed',
                            totalAmountCollected: '$totalAmountCollected',
                        },
                    },
                },
            },
        ]);

        console.log('Aggregation Result:', records);

        // Prepare data for Excel
        const excelData = formatExcelData(records, dateRange);

        // Generate Excel file
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Water Dispensed Data');

        //const filePath = path.join(__dirname, 'WaterDispensedData.xlsx');
        // XLSX.writeFile(workbook, filePath);

        // Get the user's Downloads folder
        const downloadsPath = path.join(os.homedir(), 'Downloads', 'WaterDispensedData.xlsx');
        XLSX.writeFile(workbook, downloadsPath);
        setTimeout(() => {
          res.download(downloadsPath, 'WaterDispensedData.xlsx', (err) => {
              if (err) {
                  console.error("Error downloading file:", err);
              }
          });
        }, 500);
        console.log("Excel file saved at ",downloadsPath);
        //res.json({ message: 'Excel file generated successfully.', downloadsPath });
    } catch (error) {
        console.error('Error generating Excel:', error);
        res.status(500).json({ error: error.message });
    }
});



// GET: Fetch water dispensed and amount for all master sites, including totals
/*app.get('/api/impactData1', async (req, res) => {
    try {
        const { startMonth, startYear, endMonth, endYear } = req.query;

        if (!startMonth || !startYear || !endMonth || !endYear) {
            return res.status(400).json({ message: 'Missing required query parameters.' });
        }

        // Generate month/year combinations in the range
        const dateRange = generateDateRange(startMonth, startYear, endMonth, endYear);

        // Fetch all master sites and their child site IDs
        const masterSites = await MasterSite.find().lean();

        const masterSiteMap = {};
        const allChildSiteIds = [];
        
        masterSites.forEach((masterSite) => {
            const childSiteIds = masterSite.childSites.map((child) => {
                if (child instanceof DBRef) {
                    return child.oid.toString();
                }
                if (child?.$id?.$oid) {          
                    return new ObjectId(child.$id.$oid);
                }
                return null;
            }).filter(Boolean);

            masterSiteMap[masterSite._id.toString()] = {
                name: masterSite.name,
                childSiteIds,
            };
            allChildSiteIds.push(...childSiteIds);
        });

        if (allChildSiteIds.length === 0) {
            return res.status(400).json({ message: "No valid child site IDs found." });
        }

        // MongoDB Aggregation
        const records = await DispenserRecords.aggregate([
            {
                $addFields: {
                    adjustedWaterDispensed: {
                        $cond: {
                            if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                            then: { $divide: ['$totalWaterDispensed', 1000] },
                            else: '$totalWaterDispensed',
                        },
                    },
                },
            },
            {
                $match: {
                    siteId: { $in: allChildSiteIds },
                    recordType: 'MONTHLY',
                    date: { $in: dateRange },
                },
            },
            {
                $group: {
                    _id: { masterSiteId: '$masterSiteId', siteId: '$siteId', siteName: '$site', date: '$date' },
                    totalWaterDispensed: { $sum: { $toDouble: '$adjustedWaterDispensed' } },
                    totalAmountCollected: { $sum: { $toDouble: '$totalAmountCollected' } },
                },
            },
            {
                $group: {
                    _id: { masterSiteId: '$_id.masterSiteId' },
                    monthlyData: {
                        $push: {
                            siteName: '$_id.siteName',
                            month: '$_id.date',
                            totalWaterDispensed: '$totalWaterDispensed',
                            totalAmountCollected: '$totalAmountCollected',
                        },
                    },
                    siteTotalWaterDispensed: { $sum: '$totalWaterDispensed' },
                    siteTotalAmountCollected: { $sum: '$totalAmountCollected' },
                },
            },
        ]);

        // Calculate overall totals across all master sites
        const overallTotals = records.reduce(
            (totals, record) => {
                totals.totalWaterDispensed += record.siteTotalWaterDispensed;
                totals.totalAmountCollected += record.siteTotalAmountCollected;
                return totals;
            },
            { totalWaterDispensed: 0, totalAmountCollected: 0 }
        );

        // Map aggregation results back to master site names
        const impactData = records.map((record) => {
            const masterSite = masterSiteMap[record._id.masterSiteId?.toString()];
            console.log("master site loop back1 now= ", masterSite);
            return {
                masterSiteName: masterSite?.name || 'Unknown',
                monthlyData: record.monthlyData,
                siteTotalWaterDispensed: record.siteTotalWaterDispensed,
                siteTotalAmountCollected: record.siteTotalAmountCollected,
            };
        });

        res.json({
            data: impactData,
            totals: overallTotals,
        });
    } catch (error) {
        console.error('Error fetching impact data:', error);
        res.status(500).json({ error: error.message });
    }
});

*/
//Impact1
/*
app.get('/api/impactData1', async (req, res) => {
  try {

      console.log("Heloooooo I am here new")
      const { startMonth, startYear, endMonth, endYear } = req.query;

      if (!startMonth || !startYear || !endMonth || !endYear) {
          return res.status(400).json({ message: 'Missing required query parameters.' });
      }

      // Generate month/year combinations in the range
      const dateRange = generateDateRange(startMonth, startYear, endMonth, endYear);

      // Fetch all master sites and their child site IDs
      const masterSites = await MasterSite.find().lean();

      const masterSiteMap = {};
      const allChildSiteIds = [];
      
      masterSites.forEach((masterSite) => {
          const childSiteIds = masterSite.childSites.map((child) => {
              if (child instanceof DBRef) {
                  return child.oid.toString();
              }
              if (child?.$id?.$oid) {          
                  return new ObjectId(child.$id.$oid);
              }
              return null;
          }).filter(Boolean);

          masterSiteMap[masterSite._id.toString()] = {
              name: masterSite.name,
              childSiteIds,
          };
          allChildSiteIds.push(...childSiteIds);
      });

      if (allChildSiteIds.length === 0) {
          return res.status(400).json({ message: "No valid child site IDs found." });
      }

      // MongoDB Aggregation
      const records = await DispenserRecords.aggregate([
          {
              $addFields: {
                  adjustedWaterDispensed: {
                      $cond: {
                          if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                          then: { $divide: ['$totalWaterDispensed', 1000] },
                          else: '$totalWaterDispensed',
                      },
                  },
              },
          },
          {
              $match: {
                  siteId: { $in: allChildSiteIds },
                  recordType: 'MONTHLY',
                  date: { $in: dateRange },
              },
          },
          {
              $group: {
                  _id: { masterSiteId: '$masterSiteId', siteId: '$siteId', siteName: '$site', date: '$date' },
                  totalWaterDispensed: { $sum: { $toDouble: '$adjustedWaterDispensed' } },
                  totalAmountCollected: { $sum: { $toDouble: '$totalAmountCollected' } },
              },
          },
          {
              $group: {
                  _id: { masterSiteId: '$_id.masterSiteId' },
                  monthlyData: {
                      $push: {
                          siteName: '$_id.siteName',
                          month: '$_id.date',
                          totalWaterDispensed: '$totalWaterDispensed',
                          totalAmountCollected: '$totalAmountCollected',
                      },
                  },
                  siteTotalWaterDispensed: { $sum: '$totalWaterDispensed' },
                  siteTotalAmountCollected: { $sum: '$totalAmountCollected' },
              },
          },
      ]);

      // Calculate overall totals across all master sites
      const overallTotals = records.reduce(
          (totals, record) => {
              totals.totalWaterDispensed += record.siteTotalWaterDispensed;
              totals.totalAmountCollected += record.siteTotalAmountCollected;
              return totals;
          },
          { totalWaterDispensed: 0, totalAmountCollected: 0 }
      );

      // Map aggregation results back to master site names
      const impactData = records.map((record) => {
          const masterSite = masterSiteMap[record._id.masterSiteId?.toString()];
          console.log("master site loop back1 now= ", masterSite);
          return {
              masterSiteName: masterSite?.name || 'Unknown',
              monthlyData: record.monthlyData,
              siteTotalWaterDispensed: record.siteTotalWaterDispensed,
              siteTotalAmountCollected: record.siteTotalAmountCollected,
          };
      });

      res.json({
          data: impactData,
          totals: overallTotals,
      });
  } catch (error) {
      console.error('Error fetching impact data:', error);
      res.status(500).json({ error: error.message });
  }
});
*/
//Impact1





// Function to generate month-year combinations
/*function generateDateRange(startMonth, startYear, endMonth, endYear) {
    const dateRange = [];
    let currentMonth = parseInt(startMonth, 10);
    let currentYear = parseInt(startYear, 10);
    const targetMonth = parseInt(endMonth, 10);
    const targetYear = parseInt(endYear, 10);

    while (currentYear < targetYear || (currentYear === targetYear && currentMonth <= targetMonth)) {
        const formattedDate ='/'+ `0${currentMonth}`.slice(-2) + '/' + currentYear;
        
        dateRange.push(formattedDate);

        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
    }
    return dateRange;
}
*/
app.get('/api/impactData1', async (req, res) => {
  try {
      console.log("Heloooooo I am here new");

      const { startMonth, startYear, endMonth, endYear } = req.query;

      if (!startMonth || !startYear || !endMonth || !endYear) {
          return res.status(400).json({ message: 'Missing required query parameters.' });
      }

      // Generate month/year combinations in the range
      const dateRange = generateDateRange(startMonth, startYear, endMonth, endYear);
      console.log("Generated date range:", dateRange);

      // Fetch all master sites and their child site IDs
      const masterSites = await MasterSite.find().lean();
      console.log("Fetched master sites:", masterSites.length);

      const masterSiteMap = {};
      const allChildSiteIds = [];

      masterSites.forEach((masterSite) => {
          const childSiteIds = masterSite.childSites.map((child) => {
              if (child instanceof DBRef) {
                  return child.oid.toString();
              }
              if (child?.$id?.$oid) {
                  return new ObjectId(child.$id.$oid);
              }
              return null;
          }).filter(Boolean);

          masterSiteMap[masterSite._id.toString()] = {
              name: masterSite.name,
              childSiteIds,
          };
          allChildSiteIds.push(...childSiteIds);
      });

      console.log("All child site IDs:", allChildSiteIds);

      if (allChildSiteIds.length === 0) {
          return res.status(400).json({ message: "No valid child site IDs found." });
      }

      // MongoDB Aggregation
      const records = await DispenserRecords.aggregate([
          {
              $addFields: {
                  adjustedWaterDispensed: {
                      $cond: {
                          if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                          then: { $divide: ['$totalWaterDispensed', 1000] },
                          else: '$totalWaterDispensed',
                      },
                  },
              },
          },
          {
              $match: {
                  siteId: { $in: allChildSiteIds },
                  recordType: 'MONTHLY',
                  date: { $in: dateRange },
              },
          },
          {
              $group: {
                  _id: { masterSiteId: '$masterSiteId', siteId: '$siteId', siteName: '$site', date: '$date' },
                  totalWaterDispensed: { $sum: { $toDouble: '$adjustedWaterDispensed' } },
                  totalAmountCollected: { $sum: { $toDouble: '$totalAmountCollected' } },
              },
          },
          {
              $group: {
                  _id: { masterSiteId: '$_id.masterSiteId' },
                  monthlyData: {
                      $push: {
                          siteName: '$_id.siteName',
                          month: '$_id.date',
                          totalWaterDispensed: '$totalWaterDispensed',
                          totalAmountCollected: '$totalAmountCollected',
                      },
                  },
                  siteTotalWaterDispensed: { $sum: '$totalWaterDispensed' },
                  siteTotalAmountCollected: { $sum: '$totalAmountCollected' },
              },
          },
      ]);

      console.log("Aggregation result:", JSON.stringify(records, null, 2));

      // Calculate overall totals across all master sites
      const overallTotals = records.reduce(
          (totals, record) => {
              totals.totalWaterDispensed += record.siteTotalWaterDispensed;
              totals.totalAmountCollected += record.siteTotalAmountCollected;
              return totals;
          },
          { totalWaterDispensed: 0, totalAmountCollected: 0 }
      );

      console.log("Overall totals:", overallTotals);

      // Map aggregation results back to master site names
      const impactData = records.map((record) => {
          const masterSite = masterSiteMap[record._id.masterSiteId?.toString()];
          console.log("Master site mapping:", masterSite);
          return {
              masterSiteName: masterSite?.name || 'Unknown',
              monthlyData: record.monthlyData,
              siteTotalWaterDispensed: record.siteTotalWaterDispensed,
              siteTotalAmountCollected: record.siteTotalAmountCollected,
          };
      });

      console.log("Final impact data:", JSON.stringify(impactData, null, 2));

      res.json({
          data: impactData,
          totals: overallTotals,
      });
  } catch (error) {
      console.error('Error fetching impact data:', error);
      res.status(500).json({ error: error.message });
  }
});

// Function to generate month-year combinations
function generateDateRange(startMonth, startYear, endMonth, endYear) {
  const dateRange = [];
  let currentMonth = parseInt(startMonth, 10);
  let currentYear = parseInt(startYear, 10);
  const targetMonth = parseInt(endMonth, 10);
  const targetYear = parseInt(endYear, 10);

  while (currentYear < targetYear || (currentYear === targetYear && currentMonth <= targetMonth)) {
      const formattedDate = '/' + `0${currentMonth}`.slice(-2) + '/' + currentYear;
      dateRange.push(formattedDate);
      currentMonth++;
      if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
      }
  }
  return dateRange;
}

// Function to format data for Excel
function formatExcelData(records, dateRange) {
    const result = [];
    const AllResult=[];
    records.forEach((record) => {
        const row = {
            SiteID: record._id.siteId,
            SiteName: record._id.siteName,
        };

        // Initialize all months to 0
        dateRange.forEach((date) => {
            row[`Water (${date})`] = 0;
            row[`Amt (${date})`] = 0;
        });

        // Fill monthly data
        record.monthlyData.forEach((data) => {
            row[`Water (${data.month})`] = data.totalWaterDispensed || 0;
            row[`Amt (${data.month})`] = data.totalAmountCollected || 0;
            
        });

        result.push(row);
    });


    // Add a Grand Total row
    const grandTotal = { SiteID: 'Grand Total', SiteName: '' };
    let AllTotWater = 0;
    let AllTotAmt = 0;
    dateRange.forEach((date) => {
        const totalWater = records.reduce((sum, record) => {
            const monthData = record.monthlyData.find((data) => data.month === date);
            return sum + (monthData ? monthData.totalWaterDispensed : 0);
        }, 0);
        const totalAmount = records.reduce((sum, record) => {
            const monthData = record.monthlyData.find((data) => data.month === date);
            return sum + (monthData ? monthData.totalAmountCollected : 0);
        }, 0);

        grandTotal[`Water (${date})`] = totalWater;
        AllTotWater= AllTotWater + totalWater;
        grandTotal[`Amt (${date})`] = totalAmount;
        AllTotAmt= AllTotAmt + totalAmount;
    });
    result.push(grandTotal);
    AllResult.push(AllTotWater, AllTotAmt);
    console.log("AllWater= ", AllTotWater, "AllAmt= ",AllTotAmt);
    


    // Add the custom row with master site and provided data
      const customRow = {
        SiteID: "All",
        SiteName: 'MasteSite',
    };
    dateRange.forEach(() => {
        customRow[`Water (${dateRange[0]})`] = AllTotWater; // Example: Insert data1
        customRow[`Amt (${dateRange[0]})`] = AllTotAmt;   // Example: Insert data2
    });

    result.push(customRow);
    return result;
}



app.get('/api/impactDataByMonth', async (req, res) => {
  try {
      const { startMonth, startYear, endMonth, endYear } = req.query;

      if (!startMonth || !startYear || !endMonth || !endYear) {
          return res.status(400).json({ message: 'Missing required query parameters.' });
      }

      // Generate month/year combinations in the range
      const dateRange = generateDateRange(startMonth, startYear, endMonth, endYear);

      // MongoDB Aggregation
      const records = await DispenserRecords.aggregate([
          {
              $addFields: {
                  adjustedWaterDispensed: {
                      $cond: {
                          if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                          then: { $divide: ['$totalWaterDispensed', 1000] },
                          else: '$totalWaterDispensed',
                      },
                  },
              },
          },
          {
              $match: {
                  recordType: 'MONTHLY',
                  date: { $in: dateRange },
              },
          },
          {
              $group: {
                  _id: { month: '$date' },
                  totalWaterDispensed: { $sum: { $toDouble: '$adjustedWaterDispensed' } },
                  totalAmountCollected: { $sum: { $toDouble: '$totalAmountCollected' } },
              },
          },
          {
              $sort: { '_id.month': 1 }, // Sort by month for a chronological order
          },
          {
              $project: {
                  month: '$_id.month',
                  totalWaterDispensed: 1,
                  totalAmountCollected: 1,
                  _id: 0,
              },
          },
      ]);

      res.json({
          data: records,
          message: 'Monthly impact data fetched successfully.',
      });
  } catch (error) {
      console.error('Error fetching impact data by month:', error);
      res.status(500).json({ error: error.message });
  }
});


//new impact carbon credit
app.get('/api/impactDataByMonth1', async (req, res) => {
  try {
      const { startMonth, startYear, endMonth, endYear } = req.query;

      if (!startMonth || !startYear || !endMonth || !endYear) {
          return res.status(400).json({ message: 'Missing required query parameters.' });
      }

      // Generate month/year combinations in the range
      const dateRange = generateDateRange(startMonth, startYear, endMonth, endYear);

      // Fetch all master sites and their child site IDs
      const masterSites = await MasterSite.find().lean();

      console.log("Mast received=", masterSites);
      const masterSiteMap = {};
      const allChildSiteIds = [];
      
      masterSites.forEach((masterSite) => {
          const childSiteIds = masterSite.childSites.map((child) => {
              if (child instanceof DBRef) {
                  return child.oid.toString();
              }
              if (child?.$id?.$oid) {
                  return new ObjectId(child.$id.$oid);
              }
              return null;
          }).filter(Boolean);

          masterSiteMap[masterSite._id.toString()] = {
              name: masterSite.name,
              childSiteIds,
          };
          allChildSiteIds.push(...childSiteIds);
      });

      if (allChildSiteIds.length === 0) {
          return res.status(400).json({ message: "No valid child site IDs found." });
      }

      // MongoDB Aggregation for monthly data
      const records = await DispenserRecords.aggregate([
          {
              $addFields: {
                  adjustedWaterDispensed: {
                      $cond: {
                          if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                          then: { $divide: ['$totalWaterDispensed', 1000] },
                          else: '$totalWaterDispensed',
                      },
                  },
              },
          },
          {
              $match: {
                  siteId: { $in: allChildSiteIds },
                  recordType: 'MONTHLY',
                  date: { $in: dateRange },
              },
          },
          {
              $group: {
                  _id: { masterSiteId: '$masterSiteId', siteId: '$siteId', siteName: '$site', date: '$date' },
                  totalWaterDispensed: { $sum: { $toDouble: '$adjustedWaterDispensed' } },
                  totalAmountCollected: { $sum: { $toDouble: '$totalAmountCollected' } },
              },
          },
          {
              $group: {
                  _id: { masterSiteId: '$_id.masterSiteId' },
                  monthlyData: {
                      $push: {
                          siteName: '$_id.siteName',
                          month: '$_id.date',
                          totalWaterDispensed: '$totalWaterDispensed',
                          totalAmountCollected: '$totalAmountCollected',
                      },
                  },
                  siteTotalWaterDispensed: { $sum: '$totalWaterDispensed' },
                  siteTotalAmountCollected: { $sum: '$totalAmountCollected' },
              },
          },
      ]);

      // Calculate overall totals across all master sites
      const overallTotals = records.reduce(
          (totals, record) => {
              totals.totalWaterDispensed += record.siteTotalWaterDispensed;
              totals.totalAmountCollected += record.siteTotalAmountCollected;
              return totals;
          },
          { totalWaterDispensed: 0, totalAmountCollected: 0 }
      );

      // Map aggregation results back to master site names
      const impactData = records.map((record) => {
          const masterSite = masterSiteMap[record._id.masterSiteId?.toString()];
          console.log("master site loop back= record= ", masterSite, records);
          return {
              masterSiteName: masterSite?.name || 'Unknown',
              monthlyData: record.monthlyData,
              siteTotalWaterDispensed: record.siteTotalWaterDispensed,
              siteTotalAmountCollected: record.siteTotalAmountCollected,
          };
      });

      res.json({
          data: impactData,
          totals: overallTotals,
      });
  } catch (error) {
      console.error('Error fetching impact data:', error);
      res.status(500).json({ error: error.message });
  }
});

app.get('/api/monthly-water', async (req, res) => {
    try
     {
        const monthlyData = await DispenserRecords.aggregate([
          {
            $addFields: {
                adjustedWaterDispensed: {
                    $cond: {
                        if: { $eq: ['$dispenserType', 'ACCORD_RASPI_THREE_TAP'] },
                        then: { $divide: ['$totalWaterDispensed', 1000] },
                        else: '$totalWaterDispensed',
                    },
                },
            },
        },
          {
            $match: {
              recordType: "MONTHLY",
              date: { $regex: "/2024" } // Fetch all records for 2024
            }
          },
          {
            $group: {
             _id: { $substr: ["$date", 1, 2] }, // Extract month from date "/MM/YYYY"
              totalDispensed: { $sum: { $toDecimal: "$adjustedWaterDispensed" }
             
             }
            }
          },
          {
            $sort: { "_id": 1 } // Sort by month
          }
        ]);
    
        // Convert data into chart-friendly format
        const labels = monthlyData.map(item => {
          const monthNames = [
            "January", "February", "March", "April", "May","June", "July", "August", "September", "October","November", "December"
          ];
          return monthNames[parseInt(item._id) - 1]; // Convert "01" to "January"
        });
    
        const dataValues = monthlyData.map(item => item.totalDispensed);
        console.log("dataValues= ", dataValues);
        console.log("new data= ", { labels, dataValues });
        res.json({ labels, dataValues });
      } catch (error) {
        console.error("Error fetching monthly water data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });


    const esgSchema = new mongoose.Schema({
      category: String, // Environmental, Social, Governance
      metric: String, // e.g., Carbon Reduction, Jobs Created
      value: Number, // e.g., 12000 (liters of water saved)
      year: Number, // e.g., 2025
      description: String,
    });
    

    //esg
    const ESG = mongoose.model("EsgNew", esgSchema);
    
    app.get('/api/esg', async (req, res) => {
      const data = await ESG.find();
      res.json(data);
    });
    
    app.post('/api/esg', async (req, res) => {
      console.log("it is", req);
      const newMetric = new ESG(req.body);
      await newMetric.save();
      console.log("it is", req.body);
      res.json(newMetric);
    });

    const sampleData1 = [
      {
        "category": "Environmental",
        "metric": "Water Saved",
        "value": 15000,
        "year": 15000,
        "description" : "Liters of water saved by Arosia kiosks"
    },
   ];
    
    ESG.insertMany(sampleData1)
      .then(() => console.log("Sample data inserted1"))
      .catch((err) => console.error(err));


      const waterUsageData = [
        { latitude: 28.6139, longitude: 77.2090, water_usage: 90 }, // Delhi
        { latitude: 19.0760, longitude: 72.8777, water_usage: 80 }, // Mumbai
        { latitude: 13.0827, longitude: 80.2707, water_usage: 70 }, // Chennai
        { latitude: 22.5726, longitude: 88.3639, water_usage: 60 }, // Kolkata
        { latitude: 12.9716, longitude: 77.5946, water_usage: 85 }, // Bangalore
        { latitude: 26.9124, longitude: 75.7873, water_usage: 50 }, // Jaipur
        { latitude: 17.3850, longitude: 78.4867, water_usage: 75 }, // Hyderabad
        { latitude: 23.2599, longitude: 77.4126, water_usage: 65 }, // Bhopal
        { latitude: 21.1702, longitude: 72.8311, water_usage: 55 }, // Surat
        { latitude: 25.3176, longitude: 82.9739, water_usage: 45 }  // Varanasi
      ];
      
      app.get("/waterUsageData", (req, res) => {
        res.json(waterUsageData);
      });
    
    
    