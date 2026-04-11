document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('tableBody');
    const refreshBtn = document.getElementById('refreshBtn');

    const fetchAppointments = async () => {
        tableBody.innerHTML = '<tr><td colspan="5" class="loading">Loading...</td></tr>';
        
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();
            
            if (data.error) {
                tableBody.innerHTML = `<tr><td colspan="5" class="loading" style="color:red;">Error: ${data.error}</td></tr>`;
                return;
            }

            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="loading">No appointment requests yet.</td></tr>';
                return;
            }

            tableBody.innerHTML = '';
            data.forEach(appointment => {
                const dateObj = new Date(appointment.createdAt);
                
                // Format: Sep 14, 2:30 PM
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
                                ', ' + dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="color: #666; font-size: 0.9em;">${dateStr}</td>
                    <td style="font-weight: 500; font-size: 1.05em;">${appointment.name}</td>
                    <td>
                        <div style="margin-bottom: 4px;">✉️ <a href="mailto:${appointment.email}" style="color: #2F2F2F; text-decoration: none;">${appointment.email}</a></div>
                        <div style="color: #666; font-size: 0.95em;">📞 <a href="tel:${appointment.phone}" style="color: #666; text-decoration: none;">${appointment.phone}</a></div>
                    </td>
                    <td>
                        <div style="font-size: 0.9em; color: #444; word-break: break-word;">${appointment.address || '<em>Not provided</em>'}</div>
                    </td>
                    <td><span class="badge">${appointment.service}</span></td>
                    <td style="max-width: 300px; font-size: 0.9em; color:#555; line-height: 1.4;">${appointment.message || '<em>No message attached</em>'}</td>
                `;
                tableBody.appendChild(tr);
            });
        } catch (err) {
            console.error(err);
            tableBody.innerHTML = `<tr><td colspan="5" class="loading" style="color:red;">Failed to fetch data. Ensure your server is running.</td></tr>`;
        }
    };

    // Initial fetch
    fetchAppointments();

    refreshBtn.addEventListener('click', () => {
        refreshBtn.innerText = 'Refreshing...';
        setTimeout(() => refreshBtn.innerText = 'Refresh Data', 1000);
        fetchAppointments();
    });
});
