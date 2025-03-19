import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Rating,
  Card,
  CardContent,
} from "@mui/material";

const ReviewForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(); // Reset form after submission
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Submit your Review
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Name Field */}
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Comment Field */}
          <Controller
            name="comment"
            control={control}
            defaultValue=""
            rules={{ required: "Comment is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Review"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                error={!!errors.comment}
                helperText={errors.comment?.message}
              />
            )}
          />

          {/* Star Rating */}
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            rules={{ required: "Rating is required" }}
            render={({ field }) => (
              <Box sx={{ my: 2 }}>
                <Typography variant="body1">Rating</Typography>
                <Rating {...field} precision={0.5} />
                {errors.rating && (
                  <Typography color="error" variant="body2">
                    {errors.rating.message}
                  </Typography>
                )}
              </Box>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth>
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
