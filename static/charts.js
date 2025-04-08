let barChart, pieChart;

function renderCharts(data) {
  const ctxBar = document.getElementById("barChart").getContext("2d");
  const ctxPie = document.getElementById("pieChart").getContext("2d");

  const top5 = data.slice(0, 5);
  const names = top5.map((d) => d["User Name"]);
  const scores = top5.map((d) => d.Total);

  // Destroy previous charts if they exist
  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();

  // Bar Chart: Top 5 scorers
  barChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: names,
      datasets: [
        {
          label: "Total Points",
          data: scores,
          backgroundColor: [
            "#facc15", // gold
            "#e5e7eb", // silver
            "#d97706", // bronze
            "#38bdf8",
            "#a78bfa",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "🏅 Top 5 Scorers", font: { size: 18 } },
      },
    },
  });

  // Pie Chart: Overall distribution of categories
  const totals = data.reduce(
    (acc, curr) => {
      acc.badges += curr["# of Skill Badges Completed"] || 0;
      acc.arcade += curr["# of Arcade Games Completed"] || 0;
      acc.courses += curr["# of Lab-free Courses Completed"] || 0;
      return acc;
    },
    { badges: 0, arcade: 0, courses: 0 }
  );

  pieChart = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["Skill Badges", "Arcade Games", "Courses"],
      datasets: [
        {
          data: [totals.badges, totals.arcade, totals.courses],
          backgroundColor: ["#10b981", "#3b82f6", "#f97316"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "📊 Category Distribution",
          font: { size: 18 },
        },
      },
    },
  });
}
