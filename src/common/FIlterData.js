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

const getSizeVer = (type, item, label) => {
  if (type === 'Room size') {
    return item?.rm_size === label;
  }
  if (type === 'Furnished Status') {
    return item?.rm_furnisd_status === label;
  }
  if (type === 'Prefered banat type') {
    return item?.rm_availble === label;
  }
  if (type === 'Parking availability') {
    return item?.rm_prking_avblity === label;
  }
  if (type === 'Independent') {
    return item?.rm_depndecy === label;
  }
  if (type === 'Rent range') {
    let limitArray = label.split('-');
    let rent = Number(item?.rm_rent);
    let lowerLMT = Number(limitArray[0]);
    let upperLMT = Number(limitArray[1]);

    return lowerLMT <= rent && upperLMT >= rent;
  }
  // if (type === 'Furnished Status') {
  //   return item?.rm_furnisd_status === label;
  // }
  // if (type === 'Furnished Status') {
  //   return item?.rm_furnisd_status === label;
  // }
  // if (type === 'Furnished Status') {
  //   return item?.rm_furnisd_status === label;
  // }
};
const applyFilter = (rooms, filter) => {
  console.log('rooms>>>>>>>>>>>>>>>', rooms, filter);
  let tmp = [...rooms];
  filter?.map(item => {
    let type = item.label;
    let tmp1 = [];
    let check = false;
    item.data?.map(item => {
      if (item.isApplied) {
        check = true;
        tmp.map(item1 => {
          if (getSizeVer(type, item1, item.label)) {
            if (tmp1.indexOf(item1)) {
              tmp1.push(item1);
            }
          }
        });
      }
    });
    if (check) {
      //   const
      tmp = [...tmp1];
    }
  });
  return tmp;
};
export {filterData, getRoomCount, filterRoom, filterDataAll, applyFilter};
