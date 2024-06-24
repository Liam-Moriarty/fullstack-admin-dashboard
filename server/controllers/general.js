import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transactation from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // HARDCODED VALUES ONLY BECAUSE WE'RE LIMITED TO OUR MOCK DATA
    const currentMonth = "November";
    const currentYear = 2021;
    const curretnDay = "2021-11-15";

    // GET THE FIRST 50 TRANSACTIONS
    const transactions = await Transactation.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // Overall Stats
    const overallStats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStats[0].dailyData.find(({ date }) => {
      return date === curretnDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
