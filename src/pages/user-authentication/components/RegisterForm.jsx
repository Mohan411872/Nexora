import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../components/ui/AuthenticationGuard';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const userTypeOptions = [
    { value: 'student', label: 'Student', description: 'Academic focus and study sessions' },
    { value: 'professional', label: 'Professional', description: 'Work productivity and deep focus' },
    { value: 'educator', label: 'Educator', description: 'Teaching and classroom management' },
    { value: 'freelancer', label: 'Freelancer', description: 'Project-based work focus' }
  ];

  // Mock existing usernames for availability check
  const existingUsernames = ['admin', 'test', 'user', 'demo', 'nexora'];

  const checkUsernameAvailability = async (username) => {
    if (username?.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isAvailable = !existingUsernames?.includes(username?.toLowerCase());
    setUsernameAvailable(isAvailable);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/?.test(formData?.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    } else if (usernameAvailable === false) {
      newErrors.username = 'Username is already taken';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.userType) {
      newErrors.userType = 'Please select your user type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Check username availability
    if (name === 'username' && value?.length >= 3) {
      checkUsernameAvailability(value);
    }
  };

  const handleUserTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      userType: value
    }));

    if (errors?.userType) {
      setErrors(prev => ({
        ...prev,
        userType: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create user data
      const userData = {
        id: Date.now(),
        username: formData?.username,
        email: formData?.email,
        userType: formData?.userType,
        name: formData?.username,
        joinDate: new Date()?.toISOString(),
        isNewUser: true
      };

      const token = `nexora_token_${Date.now()}`;
      login(userData, token);
      navigate('/main-dashboard');
    } catch (error) {
      setErrors({
        general: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <div className="relative">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          disabled={isLoading}
        />
        {formData?.username?.length >= 3 && (
          <div className="absolute right-3 top-9">
            {usernameAvailable === null ? (
              <Icon name="Loader2" size={16} className="text-muted-foreground animate-spin" />
            ) : usernameAvailable ? (
              <Icon name="Check" size={16} className="text-success" />
            ) : (
              <Icon name="X" size={16} className="text-error" />
            )}
          </div>
        )}
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
        disabled={isLoading}
      />
      <Select
        label="User Type"
        placeholder="Select your role"
        options={userTypeOptions}
        value={formData?.userType}
        onChange={handleUserTypeChange}
        error={errors?.userType}
        required
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Create a password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          description="Must contain uppercase, lowercase, and number"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          disabled={isLoading}
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>
      <div className="flex items-start space-x-2 pt-2">
        <input
          type="checkbox"
          id="terms"
          required
          className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-0.5"
          disabled={isLoading}
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          I agree to the{' '}
          <button type="button" className="text-primary hover:text-primary/80 underline">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="text-primary hover:text-primary/80 underline">
            Privacy Policy
          </button>
        </label>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="right"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;