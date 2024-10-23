interface Room {
    id: number;
    name: string;
    price: number;
}

let rooms: Room[] = [];

async function fetchRooms(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/api/rooms'); // Đường dẫn đến server
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        rooms = await response.json(); // Cập nhật dữ liệu toàn cục
        renderRooms(); // Hiển thị phòng
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
}


async function addRoom(name: string, price: number): Promise<void> {
    // Tìm ID lớn nhất trong mảng rooms
    const maxId = rooms.length > 0 ? Math.max(...rooms.map(room => room.id)) : 0;
    
    // Tạo ID mới bằng ID lớn nhất cộng thêm 1
    const newRoom = { id: maxId + 1, name, price }; // Nếu maxId = 1, thì id mới sẽ là 2

    const response = await fetch('http://localhost:3000/api/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom)
    });

    if (response.ok) {
        const addedRoom = await response.json();
        rooms.push(addedRoom); // Thêm phòng vào mảng
        renderRooms(); // Cập nhật giao diện
    } else {
        console.error('Error adding room:', response.statusText);
    }
}



async function updateRoom(id: number, newName: string, newPrice: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName, price: newPrice })
    });

    if (response.ok) {
        const updatedRoom = await response.json();
        const index = rooms.findIndex(room => room.id === id);
        rooms[index] = updatedRoom; // Cập nhật phòng trong mảng
        renderRooms(); // Cập nhật giao diện
    } else {
        console.error('Error updating room:', response.statusText);
    }
}



async function deleteRoom(id: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        rooms = rooms.filter(room => room.id !== id);
        renderRooms(); // Cập nhật giao diện
    } else {
        console.error('Error deleting room:', response.statusText);
    }
}


async function updateRoomData(): Promise<void> {
    console.log("Updating rooms data:", JSON.stringify(rooms)); // Giả lập gửi dữ liệu lên máy chủ
}

function renderRooms(): void {
    const roomList = document.getElementById('room-list');
    if (roomList) {
        roomList.innerHTML = '';
        rooms.forEach(room => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            
            const roomInfo = document.createElement('span');
            roomInfo.textContent = `ID: ${room.id}, Name: ${room.name}, Price: $${room.price}`;
            
            const buttonGroup = document.createElement('div');
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = async () => await deleteRoom(room.id);

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('btn', 'btn-warning');
            updateButton.onclick = async () => {
                const newName = prompt("Enter new name:", room.name);
                const newPrice = prompt("Enter new price:", room.price.toString());
                if (newName && newPrice) {
                    await updateRoom(room.id, newName, parseFloat(newPrice));
                }
            };

            buttonGroup.appendChild(deleteButton);
            buttonGroup.appendChild(updateButton);

            listItem.appendChild(roomInfo);
            listItem.appendChild(buttonGroup);
            roomList.appendChild(listItem);
        });
    }
}


document.getElementById('add-room')?.addEventListener('click', async () => {
    const nameInput = <HTMLInputElement>document.getElementById('room-name');
    const priceInput = <HTMLInputElement>document.getElementById('room-price');
    const name = nameInput.value;
    const price = parseFloat(priceInput.value);
    if (name && !isNaN(price)) {
        await addRoom(name, price); // Gọi hàm addRoom
        nameInput.value = '';
        priceInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetchRooms(); // Gọi hàm fetchRooms để tải danh sách phòng
});
