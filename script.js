<script>
    // Load visitors from localStorage
    const visitors = JSON.parse(localStorage.getItem('visitors')) || { today: [], upcoming: [], previous: [] };

    // Display visitors on the page
    function displayVisitors() {
        const todayVisitorsContainer = document.getElementById('todayVisitors');
        const upcomingVisitorsContainer = document.getElementById('upcomingVisitors');
        const previousVisitorsContainer = document.getElementById('previousVisitors');

        todayVisitorsContainer.innerHTML = '';
        upcomingVisitorsContainer.innerHTML = '';
        previousVisitorsContainer.innerHTML = '';

        // Helper function to create visitor cards
        function createVisitorCard(visitor, type) {
            return `
                <div class="card">
                    <h3>${visitor.name}</h3>
                    <p>ID: ${visitor.id}</p>
                    <p>Date: ${visitor.date}</p>
                    <p>Time: ${visitor.time}</p>
                    <button class="delete-btn" onclick="deleteVisitor('${visitor.id}', '${type}')">-</button>
                </div>
            `;
        }

        // Render today's visitors
        visitors.today.forEach(visitor => {
            todayVisitorsContainer.innerHTML += createVisitorCard(visitor, 'today');
        });

        // Render upcoming visitors
        visitors.upcoming.forEach(visitor => {
            upcomingVisitorsContainer.innerHTML += createVisitorCard(visitor, 'upcoming');
        });

        // Render previous visitors
        visitors.previous.forEach(visitor => {
            previousVisitorsContainer.innerHTML += createVisitorCard(visitor, 'previous');
        });
    }

    // Delete a visitor
    function deleteVisitor(id, type) {
        visitors[type] = visitors[type].filter(visitor => visitor.id !== id);
        localStorage.setItem('visitors', JSON.stringify(visitors));
        displayVisitors(); // Re-render visitors
    }

    // Logout function
    function logout() {
        window.location.href = 'index.html';
    }

    // Initialize and display visitors on page load
    window.onload = () => {
        displayVisitors();
    };
</script>