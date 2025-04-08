document.getElementById('upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('csv-file');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }

      // File info
      const fileInfo = document.getElementById('file-info');
      const date = new Date().toLocaleString();
      fileInfo.textContent = `📁 Last uploaded file: ${file.name} | 📅 ${date}`;

      const tbody = document.getElementById('leaderboard');
      tbody.innerHTML = '';

      data.forEach(row => {
        const medal = row.Rank === 1 ? '🥇' : row.Rank === 2 ? '🥈' : row.Rank === 3 ? '🥉' : row.Rank;
        const tr = document.createElement('tr');
        tr.classList.add('table-row-hover');
        tr.innerHTML = `
          <td class="px-4 py-3">${medal}</td>
          <td class="px-4 py-3">${row["User Name"]}</td>
          <td class="px-4 py-3">${row["# of Skill Badges Completed"]}</td>
          <td class="px-4 py-3">${row["# of Arcade Games Completed"]}</td>
          <td class="px-4 py-3">${row["# of Trivia Games Completed"]}</td>
          <td class="px-4 py-3">${row["# of Lab-free Courses Completed"]}</td>
          <td class="px-4 py-3">${row.Total}</td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => alert("Upload failed: " + error));
});