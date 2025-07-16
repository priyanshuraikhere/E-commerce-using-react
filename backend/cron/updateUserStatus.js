const cron = require('node-cron');
const User = require('../models/User');

cron.schedule('0 0 * * *', async () => {
  const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);

  await User.updateMany(
    { lastActivity: { $lt: fifteenDaysAgo } },
    { status: 'Inactive' }
  );

  await User.updateMany(
    { lastActivity: { $gte: fifteenDaysAgo } },
    { status: 'Active' }
  );

  console.log("User status updated based on lastActivity.");
});
