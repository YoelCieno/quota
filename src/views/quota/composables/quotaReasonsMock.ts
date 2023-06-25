const quotaReasonsMock = [
  { id: '1', text: 'Subscriber canceled flight', type: 'add' },
  { id: '2', text: 'Airline canceled flight', type: 'add' },
  { id: '3', text: 'Customer compensation', type: 'add' },
  { id: '5', text: 'Flight not redeposited after a flight cancellation', type: 'remove' },
  { id: '6', text: 'Subscriber had log in or password issues', type: 'remove' },
  { id: '7', text: 'Subscription has not renewed correctly', type: 'remove' },
  { id: '8', text: 'Subscriber had issues when booking', type: 'remove' },
  { id: '9', text: 'Other', type: 'all' },
];

export {
  quotaReasonsMock,
}