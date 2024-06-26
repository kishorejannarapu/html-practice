function getLast7Days() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    // Calculate the date for 'i' days ago
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    
    // Get the day of the week and add it to the result array
    const dayOfWeek = daysOfWeek[pastDate.getDay()];
    result.push(dayOfWeek);
  }
  
  return result;
}

console.log(getLast7Days());