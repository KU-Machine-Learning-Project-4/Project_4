document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('csvFileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        processData(csvData);
      };
      reader.readAsText(file);
    }
  });

  function processData(csvData) {
    const rows = csvData.split('\n');
    const areas = [];
    const occurrences = {};

    rows.forEach((row) => {
      const columns = row.split(',');
      const area = columns[10]; // Assuming "Area" column is in the 11th column (index 10)

      if (area && area.length === 3) {
        if (areas.includes(area)) {
          occurrences[area]++;
        } else {
          areas.push(area);
          occurrences[area] = 1;
        }
      }
    });

    createBarChart(areas, Object.values(occurrences));

    // Show the legend box after the chart is created
    document.querySelector('.legend-box').style.display = 'block';
  }

  function createBarChart(labels, data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Crime Occurrences',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Area'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Occurrences'
            }
          }
        },
        responsive: false,
        width: 400,
        height: 300,
      }
    });
  }
});
