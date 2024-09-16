export const preprocessOpeningHours = (data: any) => {
    // Define a default opening hours template
    const defaultOpeningHours = {
      open: "",
      close: "",
      closed: false,
    };
  
    // Days of the week as defined in your schema
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
  
    // Initialize processed data with default values
    const processedData: Record<string, typeof defaultOpeningHours> = {};
  
    // Ensure data is an object and not null or undefined
    if (data && typeof data === 'object') {
      // Iterate over each day of the week
      days.forEach(day => {
        // Check if there's existing data for the day
        if (data[day]) {
          processedData[day] = {
            open: data[day].open || defaultOpeningHours.open,
            close: data[day].close || defaultOpeningHours.close,
            closed: data[day].closed || defaultOpeningHours.closed,
          };
        } else {
          // Use default values if no data for the day
          processedData[day] = { ...defaultOpeningHours };
        }
      });
    } else {
      // If data is not valid, assign default values for all days
      days.forEach(day => {
        processedData[day] = { ...defaultOpeningHours };
      });
    }
  
    return processedData;
  };
  