const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

// Đọc dữ liệu từ file data.json
const loadRooms = () => {
    if (fs.existsSync('data.json')) {
        const data = fs.readFileSync('data.json');
        return JSON.parse(data);
    }
    return [];
};

// Ghi dữ liệu vào file data.json
const saveRooms = (rooms) => {
    fs.writeFileSync('data.json', JSON.stringify(rooms, null, 2));
};

// Tạo server
const server = http.createServer((req, res) => {
    // Thêm header CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Cho phép tất cả các origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Cho phép các phương thức này
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cho phép header Content-Type

    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Xử lý yêu cầu OPTIONS
    if (method === 'OPTIONS') {
        res.writeHead(204); // Không có nội dung
        res.end();
        return; // Dừng xử lý
    }

    if (method === 'GET' && parsedUrl.pathname === '/api/rooms') {
        const rooms = loadRooms();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rooms));
    } else if (method === 'POST' && parsedUrl.pathname === '/api/rooms') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newRoom = JSON.parse(body);
                const rooms = loadRooms();
                rooms.push(newRoom);
                saveRooms(rooms);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newRoom));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON format');
            }
        });
    } else if (method === 'PUT' && parsedUrl.pathname.startsWith('/api/rooms/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[3]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updatedRoom = JSON.parse(body);
                const rooms = loadRooms();
                const index = rooms.findIndex(room => room.id === id);
                if (index !== -1) {
                    rooms[index] = { id, ...updatedRoom };
                    saveRooms(rooms);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(rooms[index]));
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Room not found');
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON format');
            }
        });
    } else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/api/rooms/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[3]);
        let rooms = loadRooms();
        const initialLength = rooms.length;
        rooms = rooms.filter(room => room.id !== id);
        if (rooms.length < initialLength) {
            saveRooms(rooms);
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Room not found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Bắt đầu server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
