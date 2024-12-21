const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors'); // لا تنسَ إضافة CORS إذا كنت تعمل محليًا

app.use(cors());
app.use(express.json()); // لتفسير JSON في الـ request body

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2003', // ضع كلمة مرور MySQL هنا
    database: 'visitors_db'
});
let visitors =[
    {id: '1',name:'Visitor 1',data:'2024-12-20',time:'10:00'},
    {id: '2',name:'Visitor 2',data:'2024-12-21',time:'14:00'}
    ];
    app.get('/get-visitors', (req, res) => {
        // تأكد من أن هذه الدالة ترسل JSON بشكل صحيح
        res.json(visitors); // أو البيانات التي تريد إرسالها
    });
    
db.connect(function(err) {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

// تعريف المسار POST الخاص بإضافة الزوار
app.post('/add-visitor', (req, res) => {
    const { name, id, date, time } = req.body;
    const query = 'INSERT INTO visitors (name, id, date, time) VALUES (?, ?, ?, ?)';

    db.query(query, [name, id, date, time], (err, result) => {
        if (err) {
            console.error('Error adding visitor:', err);
            return res.status(500).json({ error: 'Error adding visitor' });
        }
        res.status(200).json({ success: true, message: 'Visitor added successfully' });
    });
});

// بدء السيرفر
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});