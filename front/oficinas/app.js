const thead=document.getElementById('thead'),tbody=document.getElementById('tbody');
fetch('http://localhost:3000/api/oficinas').then(r=>r.json()).then(res=>{
 const data=res.data||res;
 if(!data.length){tbody.innerHTML='<tr><td>No hay datos</td></tr>';return;}
 const cols=Object.keys(data[0]);
 thead.innerHTML=`<tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr>`;
 tbody.innerHTML=data.map(f=>`<tr>${cols.map(c=>`<td>${f[c]}</td>`).join('')}</tr>`).join('');
}).catch(()=>tbody.innerHTML='<tr><td>Prende el bakend: npm start</td></tr>');