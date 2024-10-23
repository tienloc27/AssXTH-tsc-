var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
var rooms = [];
function fetchRooms() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/rooms')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    rooms = _a.sent(); // Cập nhật dữ liệu toàn cục
                    renderRooms(); // Hiển thị phòng
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching rooms:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addRoom(name, price) {
    return __awaiter(this, void 0, void 0, function () {
        var maxId, newRoom, response, addedRoom;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maxId = rooms.length > 0 ? Math.max.apply(Math, rooms.map(function (room) { return room.id; })) : 0;
                    newRoom = { id: maxId + 1, name: name, price: price };
                    return [4 /*yield*/, fetch('http://localhost:3000/api/rooms', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newRoom)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    addedRoom = _a.sent();
                    rooms.push(addedRoom); // Thêm phòng vào mảng
                    renderRooms(); // Cập nhật giao diện
                    return [3 /*break*/, 4];
                case 3:
                    console.error('Error adding room:', response.statusText);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateRoom(id, newName, newPrice) {
    return __awaiter(this, void 0, void 0, function () {
        var response, updatedRoom, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/api/rooms/".concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: newName, price: newPrice })
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    updatedRoom = _a.sent();
                    index = rooms.findIndex(function (room) { return room.id === id; });
                    rooms[index] = updatedRoom; // Cập nhật phòng trong mảng
                    renderRooms(); // Cập nhật giao diện
                    return [3 /*break*/, 4];
                case 3:
                    console.error('Error updating room:', response.statusText);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteRoom(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/api/rooms/".concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        rooms = rooms.filter(function (room) { return room.id !== id; });
                        renderRooms(); // Cập nhật giao diện
                    }
                    else {
                        console.error('Error deleting room:', response.statusText);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateRoomData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Updating rooms data:", JSON.stringify(rooms)); // Giả lập gửi dữ liệu lên máy chủ
            return [2 /*return*/];
        });
    });
}
function renderRooms() {
    var _this = this;
    var roomList = document.getElementById('room-list');
    if (roomList) {
        roomList.innerHTML = '';
        rooms.forEach(function (room) {
            var listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            var roomInfo = document.createElement('span');
            roomInfo.textContent = "ID: ".concat(room.id, ", Name: ").concat(room.name, ", Price: $").concat(room.price);
            var buttonGroup = document.createElement('div');
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deleteRoom(room.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); };
            var updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.classList.add('btn', 'btn-warning');
            updateButton.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                var newName, newPrice;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newName = prompt("Enter new name:", room.name);
                            newPrice = prompt("Enter new price:", room.price.toString());
                            if (!(newName && newPrice)) return [3 /*break*/, 2];
                            return [4 /*yield*/, updateRoom(room.id, newName, parseFloat(newPrice))];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); };
            buttonGroup.appendChild(deleteButton);
            buttonGroup.appendChild(updateButton);
            listItem.appendChild(roomInfo);
            listItem.appendChild(buttonGroup);
            roomList.appendChild(listItem);
        });
    }
}
(_a = document.getElementById('add-room')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var nameInput, priceInput, name, price;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                nameInput = document.getElementById('room-name');
                priceInput = document.getElementById('room-price');
                name = nameInput.value;
                price = parseFloat(priceInput.value);
                if (!(name && !isNaN(price))) return [3 /*break*/, 2];
                return [4 /*yield*/, addRoom(name, price)];
            case 1:
                _a.sent(); // Gọi hàm addRoom
                nameInput.value = '';
                priceInput.value = '';
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
document.addEventListener('DOMContentLoaded', function () {
    fetchRooms(); // Gọi hàm fetchRooms để tải danh sách phòng
});
