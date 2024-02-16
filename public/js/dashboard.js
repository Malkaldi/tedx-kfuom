document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/attendance/dashboard-data")
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('attendanceChart').getContext('2d');
            const attendanceChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Males', 'Females'],
                    datasets: [{
                        label: 'Number of Attendees',
                        data: [data.malesAttended, data.femalesAttended],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 99, 132, 0.5)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true, // Make the chart responsive
                    maintainAspectRatio: false, // Allow height scaling
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
        })
        .catch(error => console.error("Error loading dashboard data:", error));
});
