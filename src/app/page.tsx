"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Service {
  _id: string;
  name: string;
  // Add other fields as needed
}

interface AppointmentForm {
  name: string;
  user: string;
  service: string;
  date: string;
  time: string;
}

const Home: React.FC = () => {
  const [form, setForm] = useState<AppointmentForm>({
    name: "",
    user: "",
    service: "",
    date: "",
    time: "",
  });
  const [services, setServices] = useState<Service[]>([]); // Initialize as empty array
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loadingServices, setLoadingServices] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data: Service[] = await response.json();
        setServices(data);
        setLoadingServices(false); // Update loading state
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoadingServices(false); // Update loading state even on error
        setError("Failed to fetch services"); // Set an error message
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (form.date) {
      const fetchAvailableTimes = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/appointments/available-times?date=${form.date}`
          );
          const data = await response.json();
          setAvailableTimes(data.availableTimes);
        } catch (error) {
          console.error("Error fetching available times:", error);
        }
      };

      fetchAvailableTimes();
    }
  }, [form.date]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setForm({ ...form, date: date.toISOString().split("T")[0] });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      console.log("Appointment booked successfully:", result);
      setSuccess("Appointment booked successfully!");
      setForm({ name: "", user: "", service: "", date: "", time: "" });
      setSelectedDate(new Date());
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.message);
    }
  };

  if (loadingServices) {
    return <p>Loading services...</p>; // Display loading indicator while fetching services
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if services failed to load
  }

  return (
    <main className="container">
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              name="user"
              value={form.user}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Service:</label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              {services && services.length > 0 && services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div>
            <label>Time:</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Book Appointment</button>
        </form>
      </div>
    </main>
  );
};

export default Home;
