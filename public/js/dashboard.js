// dashboard.js

document.addEventListener('DOMContentLoaded', function () {
    // Function to interpolate between green and red based on attendance percentage
    function getColorForPercentage(percentage) {
        // Calculate the color based on a spectrum
        const red = percentage > 0.5 ? 255 : Math.round(2 * percentage * 255);
        const green = percentage > 0.5 ? Math.round(2 * (1 - percentage) * 255) : 255;
        const alpha = 0.5; // Adjust alpha for fading effect, 0.5 for 50% transparency
        return `rgba(${red}, ${green}, 0, ${alpha})`; // RGBA color with alpha for faded effect
    }

    fetch('/api/dashboard/program-attendance')
        .then(response => response.json())
        .then(data => {
            // Sort data by attendance percentage in ascending order
            data.sort((a, b) => (a.attended / a.maxAttendance) - (b.attended / b.maxAttendance));

            const labels = data.map(item => item.program);
            const attendanceCounts = data.map(item => item.attended);
            const maxAttendanceValues = data.map(item => item.maxAttendance);

            const backgroundColors = data.map(item => {
                const percentage = item.attended / item.maxAttendance;
                return getColorForPercentage(percentage);
            });

            const ctxProgram = document.getElementById('programAttendanceChart').getContext('2d');
            new Chart(ctxProgram, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Attendance by Program',
                        data: attendanceCounts,
                        backgroundColor: backgroundColors,
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Programs (sorted by ascending attendance %)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching program-specific attendance data:', error));


    fetch('/api/dashboard/overall-attendance')
        .then(response => response.json())
        .then(data => {
            const ctxOverall = document.getElementById('overallAttendanceChart').getContext('2d');
            new Chart(ctxOverall, {
                type: 'bar',
                data: {
                    labels: ['Students Attended', 'Students Not Attended'],
                    datasets: [{
                        label: 'Overall Attendance',
                        data: [data.studentsAttended, data.studentsNotAttended],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255,99,132,1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching overall attendance data:', error));

});
