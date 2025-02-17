const cron = require("node-cron");
const Todo = require("../models/Todo");

const resetTodos = async () => {
  const now = new Date();
  const yesterday = new Date(now.setDate(now.getDate() - 1));

  // Calculate last Monday
  const lastMonday = new Date();
  lastMonday.setDate(lastMonday.getDate() - lastMonday.getDay() + 1);
  lastMonday.setHours(0, 0, 0, 0);

  const lastMonth = new Date(now.setMonth(now.getMonth() - 1));

  try {
    // Réinitialiser les todos quotidiennes
    await Todo.updateMany(
      {
        label: "Quotidien",
        updatedAt: { $lt: yesterday },
      },
      {
        $set: {
          category: "A faire",
          updatedAt: new Date(),
        },
      }
    );

    // Réinitialiser les todos hebdomadaires (seulement le lundi)
    if (now.getDay() === 1) {
      // 1 = Monday
      await Todo.updateMany(
        {
          label: "Hebdomadaire",
          updatedAt: { $lt: lastMonday },
        },
        {
          $set: {
            category: "A faire",
            updatedAt: new Date(),
          },
        }
      );
    }

    // Réinitialiser les todos mensuelles
    await Todo.updateMany(
      {
        label: "Mensuel",
        updatedAt: { $lt: lastMonth },
      },
      {
        $set: {
          category: "A faire",
          updatedAt: new Date(),
        },
      }
    );

    console.log("Todos reset successful");
  } catch (error) {
    console.error("Error resetting todos:", error);
  }
};

const initScheduledTasks = () => {
  // Schedule daily reset at midnight
  cron.schedule("0 0 * * *", async () => {
    console.log("Running scheduled todo reset");
    await resetTodos();
  });
};

module.exports = { initScheduledTasks, resetTodos };
