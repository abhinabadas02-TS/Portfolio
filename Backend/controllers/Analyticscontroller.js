import PageView from "../models/PageView.js";

// Helper: today's date string "YYYY-MM-DD"
const todayStr = () => new Date().toISOString().split("T")[0];

// Helper: date string N days ago
const daysAgoStr = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

// ─────────────────────────────────────────────
// POST /api/analytics/pageview
// Public — called from frontend on each route change
// Body: { page: "/" | "/projects" | "/experience" | "/contact" }
// ─────────────────────────────────────────────
export const trackPageView = async (req, res) => {
  try {
    const { page } = req.body;
    const validPages = ["/", "/projects", "/experience", "/contact"];

    if (!page || !validPages.includes(page)) {
      return res.status(400).json({
        success: false,
        message: `page must be one of: ${validPages.join(", ")}`,
      });
    }

    const date = todayStr();

    // Upsert: increment count for this page+date combo
    // If doc doesn't exist yet, create it with count=1
    const result = await PageView.findOneAndUpdate(
      { page, date },
      {
        $inc: { count: 1 },
        $setOnInsert: { page, date },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("trackPageView error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// GET /api/analytics/stats  [Admin]
// Returns aggregated analytics: total views, per-page, last 7 days
// ─────────────────────────────────────────────
export const getAnalyticsStats = async (req, res) => {
  try {
    const days = Math.min(90, parseInt(req.query.days) || 7);
    const since = daysAgoStr(days - 1);

    // All docs in range
    const docs = await PageView.find({
      date: { $gte: since, $lte: todayStr() },
    })
      .sort({ date: 1 })
      .lean();

    // Total views (all time, all pages)
    const totalAllTime = await PageView.aggregate([
      { $group: { _id: null, total: { $sum: "$count" } } },
    ]);

    // Per-page totals in date range
    const perPage = {};
    const byDate = {};

    for (const doc of docs) {
      // per page
      perPage[doc.page] = (perPage[doc.page] || 0) + doc.count;

      // by date (for chart)
      if (!byDate[doc.date]) byDate[doc.date] = { date: doc.date, total: 0 };
      byDate[doc.date].total += doc.count;
      byDate[doc.date][doc.page] = (byDate[doc.date][doc.page] || 0) + doc.count;
    }

    // Fill in missing dates with 0
    const dateChart = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = daysAgoStr(i);
      dateChart.push(byDate[d] || { date: d, total: 0 });
    }

    // Today's stats
    const todayDocs = docs.filter((d) => d.date === todayStr());
    const todayTotal = todayDocs.reduce((acc, d) => acc + d.count, 0);

    return res.json({
      success: true,
      data: {
        totalAllTime: totalAllTime[0]?.total || 0,
        todayTotal,
        periodDays: days,
        perPage,
        dateChart,
      },
    });
  } catch (error) {
    console.error("getAnalyticsStats error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};