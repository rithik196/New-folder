import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import eventData from "../../json files/event.json";

const initialValue = dayjs(); // Default to today

function ServerDay({
  highlightedDays = {},
  day,
  outsideCurrentMonth,
  onClick,
  today,
  ...other
}) {
  const formattedDate = day.format("YYYY-MM-DD");
  const eventName = highlightedDays[formattedDate];
  const isToday = day.isSame(dayjs(), "day"); // Check if this day is today

  return (
 
 
 <Tooltip title={eventName || "Click to add event"} arrow disableInteractive>
      <Badge
        key={formattedDate}
        overlap="circular"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: eventName ? "#2F5BB7" : "transparent",
            color: "#fff",
            borderRadius: "50%",
            padding: "5px",
            fontSize: "0.8rem",
          },
        }}
      >
        

<PickersDay
  {...other}
  outsideCurrentMonth={outsideCurrentMonth}
  day={day}
  sx={{
    color:isToday ? "#ddd" : "#9B1E26", // Make all text red
    backgroundColor: isToday ? "#9B1E26" : eventName ? "#2F5BB7" : "transparent", // Highlight today in red
    borderRadius: "50%",
    "&:hover": { backgroundColor: eventName ? "#234a99" : "#ddd" },
  }}
  onClick={() => onClick(formattedDate)}
/>

      </Badge>
    </Tooltip>
  );
}

export default function DateCalendarServerRequest() {
  const [highlightedDays, setHighlightedDays] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [eventText, setEventText] = useState("");

  // Load events from JSON into state
  useEffect(() => {
    const highlights = eventData.reduce((acc, event) => {
      acc[event.date] = event.event;
      return acc;
    }, {});
    setHighlightedDays(highlights);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEventText(highlightedDays[date] || "");
    setOpen(true);
  };

  const handleSaveEvent = () => {
    if (selectedDate && eventText.trim()) {
      setHighlightedDays((prev) => ({
        ...prev,
        [selectedDate]: eventText,
      }));
    }
    setOpen(false);
    setEventText("");
  };
  const [today, setToday] = useState(dayjs().startOf("day")); // Ensure it's a clean date

  useEffect(() => {
    setSelectedDate(dayjs().format("YYYY-MM-DD"));
  }, []);
  
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
  defaultValue={null} // No date is selected by default
  onChange={(newDate) => setSelectedDate(newDate?.format("YYYY-MM-DD"))} // Update when user clicks
  slots={{ day: (props) => <ServerDay {...props} onClick={handleDateClick} today={today} /> }}
  slotProps={{ day: { highlightedDays } }}
  sx={{
    width: "100%",
    height: "100%",
    "& .MuiDayCalendar-header": { display: "flex", justifyContent: "space-evenly" },
    "& .MuiDayCalendar-weekContainer": { display: "flex", justifyContent: "space-evenly" },
  }}
/>


      {/* Add Event Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 350,
      bgcolor: "#020000", // ✅ Dark background
      boxShadow: 24,
      p: 3,
      borderRadius: 2,
      color: "#F8F8F8", // ✅ Light text color
      opacity:0.89,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}>
      Add Event
    </Typography>
    
    <TextField
      fullWidth
      label="Event Name"
      variant="outlined"
      value={eventText}
      onChange={(e) => setEventText(e.target.value)}
      sx={{
        mb: 2,
        bgcolor: "#121212", // ✅ Dark input field
        input: { color: "#F8F8F8 !important" }, // ✅ Light text
        label: { color: "white !important"  }, // ✅ Lighter label
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#DA3442 !important" }, // ✅ Red border
          "&:hover fieldset": { borderColor: "#F8F8F8 !important" },
          "&.Mui-focused fieldset": { borderColor: "#DA3442" },
        },
      }}
    />
    
    <Button
      fullWidth
      variant="contained"
      sx={{
        bgcolor: "#DA3442", // ✅ Red button
        color: "#F8F8F8",
        fontWeight: 600,
        "&:hover": { bgcolor: "#B52A38" }, // ✅ Darker red on hover
      }}
      onClick={handleSaveEvent}
    >
      Save Event
    </Button>
  </Box>
</Modal>

    </LocalizationProvider>
  );
}
