const filterData = [
  {value: 'Single Room', id: 1, isApplied: false, availableRooms: 0},
  {value: '1RK', id: 2, isApplied: false, availableRooms: 0},
  {value: '1BHK', id: 3, isApplied: false, availableRooms: 0},
  {value: '2BHK', id: 4, isApplied: false, availableRooms: 0},
  {value: '3BHK', id: 5, isApplied: false, availableRooms: 0},
  {value: 'More then 3BHK', id: 6, isApplied: false, availableRooms: 0},
];
const filterDataAll = [
  {value: 'All', id: 7, isApplied: true, availableRooms: 0},
  {value: 'Single Room', id: 1, isApplied: false, availableRooms: 0},
  {value: '1RK', id: 2, isApplied: false, availableRooms: 0},
  {value: '1BHK', id: 3, isApplied: false, availableRooms: 0},
  {value: '2BHK', id: 4, isApplied: false, availableRooms: 0},
  {value: '3BHK', id: 5, isApplied: false, availableRooms: 0},
  {value: '3BHK+', id: 6, isApplied: false, availableRooms: 0},
];

const getRoomCount = (data, rooms) => {
  let temp = [...data];
  temp?.map(item => {
    let count = 0;
    rooms?.map(item1 => {
      if (item?.value === item1?.rm_size) count = count + 1;
    });
    return (item.availableRooms = count);
  });
  return temp;
};

const filterRoom = (temp, tempRoomData) => {
  let tempSearchRoom = [];
  temp?.forEach(filter => {
    if (filter.isApplied === true) {
      tempRoomData.map(item => {
        if (filter.value === item?.rm_size) {
          tempSearchRoom.push(item);
        }
      });
    }
  });
  return tempSearchRoom;
};
export {filterData, getRoomCount, filterRoom, filterDataAll};
