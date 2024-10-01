import { render, fireEvent, screen } from '@testing-library/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';

describe('AppComponent', () => {
  beforeEach(async () => {
    await render(AppComponent, {
      imports: [FormsModule],
    });
  });

  it('should display error messages when the form is submitted without email and password', async () => {
    const submitButton = screen.getByText(/login/i);
    fireEvent.click(submitButton);

    // Wait for error messages to appear
    await waitFor(() => {
      const emailError = screen.getByText(/email fields are required/i);
      const passwordError = screen.getByText(/password fields are required/i);

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it('should display error messages when the form is submitted without email', async () => {
    const submitButton = screen.getByText(/login/i);
    const password = screen.getByLabelText('Password');

    fireEvent.input(password, { target: { value: '1234567' } });

    fireEvent.click(submitButton);

    // Wait for error messages to appear
    await waitFor(() => {
      const emailError = screen.getByText(/email fields are required/i);

      expect(emailError).toBeInTheDocument();
    });
  });

  it('should display error messages when the form is submitted without password', async () => {
    const submitButton = screen.getByText(/login/i);
    const email = screen.getByLabelText('Email');

    fireEvent.input(email, { target: { value: 'test2@gmail.com' } });

    fireEvent.click(submitButton);

    // Wait for error messages to appear
    await waitFor(() => {
      const passwordError = screen.getByText(/password fields are required/i);

      expect(passwordError).toBeInTheDocument();
    });
  });

  it('should display a success message when the form is submitted with valid email and password', async () => {
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    const submitButton = screen.getByTestId('submit-btn');

    // Simulate valid input
    fireEvent.input(email, { target: { value: 'test2@gmail.com' } });
    fireEvent.input(password, { target: { value: '1234567' } });

    fireEvent.click(submitButton);

    // Wait for success message to appear
    await waitFor(() => {
      const successMessage = screen.getByText(/Successfully logged in/i);
      expect(successMessage).toBeInTheDocument();
    });
  });
});

