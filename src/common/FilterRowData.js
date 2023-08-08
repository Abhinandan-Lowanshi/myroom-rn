const row_filter_data = [
  {
    label: 'Room size',
    isMultiSelect: true,
    isOpen: false,
    id: 10,
    data: [
      {isApplied: false, label: 'Single Room', value: 'Single Room', id: 1},
      {isApplied: false, label: '1RK', value: '1RK', id: 2},
      {isApplied: false, label: '1BHK', value: '1BHK', id: 3},
      {isApplied: false, label: '2BHK', value: '2BHK', id: 4},
      {isApplied: false, label: '3BHK', value: '3BHK', id: 5},
      {
        isApplied: false,
        label: 'More then 3BHK',
        value: 'More then 3BHK',
        id: 6,
      },
    ],
  },
  {
    label: 'Room Distance',
    isMultiSelect: false,
    isOpen: false,
    id: 11,
    data: [
      {isApplied: false, label: 'Default', value: 'Default', id: 1},
      {isApplied: false, label: '1KM', value: '1', id: 2},
      {isApplied: false, label: '2KM', value: '2', id: 3},
      {isApplied: false, label: '3KM', value: '3', id: 4},
      {isApplied: false, label: '4KM', value: '4', id: 5},
      {isApplied: false, label: '5KM', value: '5', id: 6},
      {isApplied: false, label: '10KM', value: '10', id: 7},
    ],
  },
  {
    label: 'Furnished Status',
    isMultiSelect: true,
    id: 12,
    data: [
      {isApplied: false, label: 'Furnished', value: 'Furnished', id: 1},
      {isApplied: false, label: 'Unfurnished', value: 'Unfurnished', id: 2},
      {
        isApplied: false,
        label: 'Semi-Furnished',
        value: 'Semi-Furnished',
        id: 3,
      },
    ],
  },
  {
    label: 'Prefered banat type',
    isMultiSelect: true,
    isOpen: false,
    id: 13,
    data: [
      {isApplied: false, label: 'Only girls', value: 'Only girls', id: 1},
      {isApplied: false, label: 'Only boys', value: 'Only boys', id: 2},
      {isApplied: false, label: 'Only family', value: 'Only family', id: 3},
      {
        isApplied: false,
        label: 'Family and girls',
        value: 'Family and girls',
        id: 4,
      },
      {
        isApplied: false,
        label: 'Only for student (both boys and girls)',
        value: 'Only for student (both boys and girls)',
        id: 5,
      },
      {
        isApplied: false,
        label: 'Only for student (girls)',
        value: 'Only for student (girls)',
        id: 6,
      },
      {
        isApplied: false,
        label: 'Only for student (boys)',
        value: 'Only for student (boys)',
        id: 7,
      },
    ],
  },
  {
    label: 'Parking availability',
    isMultiSelect: true,
    isOpen: false,
    id: 14,
    data: [
      {isApplied: false, label: 'Yes', value: 'Yes', id: 1},
      {isApplied: false, label: 'No', value: 'No', id: 2},
    ],
  },
  {
    label: 'Dependency',
    isMultiSelect: true,
    id: 15,
    isOpen: false,
    data: [
      {isApplied: false, label: 'Yes', value: 'Yes', id: 1},
      {isApplied: false, label: 'No', value: 'No', id: 2},
    ],
  },
  {
    label: 'Rent range',
    isMultiSelect: false,
    isOpen: false,
    id: 16,
    data: [
      {isApplied: false, label: '1000-3000', value: '1000-3000', id: 1},
      {isApplied: false, label: '3000-6000', value: '3000-6000', id: 2},
      {isApplied: false, label: '6000-10000', value: '6000-10000', id: 3},
      {isApplied: false, label: '10000-20000', value: '10000-20000', id: 4},
      {isApplied: false, label: '20000-30000', value: '20000-30000', id: 5},
      {isApplied: false, label: '30000-50000', value: '30000-50000', id: 6},
      {isApplied: false, label: 'Above 50000', value: 'Above 50000', id: 7},
    ],
  },
];

export default row_filter_data;
