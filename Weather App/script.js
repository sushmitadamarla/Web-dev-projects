document.addEventListener('DOMContentLoaded', () => {
    const temperatureField = document.querySelector(".temp p");
    const locationField = document.querySelector(".time-location p");
    const dataField = document.querySelector(".time-location span");
    const weatherField = document.querySelector(".condition p");
    const searchField = document.querySelector(".search-area");
    const form = document.getElementById('weather-form');

    let target = 'Mumbai'; // Default location

    /**
     * Fetch weather details from API for the target location.
     */
    const fetchResults = async (targetLocation) => {
        const url = `http://api.weatherapi.com/v1/current.json?key=b171c9e7dd254563857110241241210&q=${targetLocation}&`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error fetching weather data: ${res.statusText}`);
            }

            const data = await res.json();
            console.log(data);

            // Extract relevant data from the response
            const locationName = data.location.name;
            const localTime = formatTime(data.location.localtime);
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;

            // Update the UI with the fetched data
            updateUI(locationName, localTime, temperature, condition);
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
            updateUI("N/A", "N/A", "N/A", "Error fetching data!");
        }
    };

    /**
     * Update the UI elements with fetched data.
     */
    const updateUI = (location, time, temperature, condition) => {
        if (temperatureField) temperatureField.textContent = `Temperature: ${temperature} °C`;
        if (locationField) locationField.textContent = `Location: ${location}`;
        if (dataField) dataField.textContent = `Time: ${time}`;
        if (weatherField) weatherField.textContent = `Condition: ${condition}`;
    };

    /**
     * Format the local time string from API (e.g., '2024-10-12 12:58').
     */
    const formatTime = (timeString) => {
        const [date, time] = timeString.split(' ');
        const [year, month, day] = date.split('-');
        const formattedDate = new Date(`${month}/${day}/${year} ${time}`);
        const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
        return formattedDate.toLocaleString('en-US', options);
    };

    /**
     * Search for a new location when form is submitted.
     */
    const searchForLocation = (e) => {
        e.preventDefault();
        target = searchField.value.trim(); // Get the city name from input
        if (target) {
            fetchResults(target);
        }
    };

    // Add event listener for form submission
    form.addEventListener('submit', searchForLocation);

    // Fetch weather for the default location on page load
    fetchResults(target);
});
