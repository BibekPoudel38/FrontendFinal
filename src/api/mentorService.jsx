

export const fetchAvailableDates = async (year, month) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mentor/availability?year=${year}&month=${month}`);
    if (!response.ok) throw new Error('Failed to fetch dates');
    return await response.json();
  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

export const fetchTimeSlots = async (dateStr) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mentor/availability/${dateStr}`);
    if (!response.ok) throw new Error('Failed to fetch time slots');
    return await response.json();
  } catch (error) {
    console.error('Error fetching time slots:', error);
    throw error;
  }
};

export const scheduleAppointment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mentor/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        timeSlot,
      }),
    });
    if (!response.ok) throw new Error('Failed to schedule appointment');
    return await response.json();
  } catch (error) {
    console.error('Error scheduling appointment:', error);
    throw error;
  }
};