import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../components/ui/AuthenticationGuard';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for testing
  const mockCredentials = [
    { email: 'student@nexora.com', password: 'student123', type: 'student' },
    { email: 'professional@nexora.com', password: 'work2024', type: 'professional' },
    { email: 'educator@nexora.com', password: 'teach456', type: 'educator' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        const userData = {
          id: Date.now(),
          email: validCredential?.email,
          userType: validCredential?.type,
          name: validCredential?.email?.split('@')?.[0],
          joinDate: new Date()?.toISOString()
        };

        const token = `nexora_token_${Date.now()}`;
        login(userData, token);
        navigate('/main-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Try: ${mockCredentials?.[0]?.email} / ${mockCredentials?.[0]?.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo, use the provided mock credentials.');
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
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
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
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            disabled={isLoading}
          />
          <span className="text-sm text-muted-foreground">Remember me</span>
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Demo Credentials Helper */}
      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
        <div className="space-y-1">
          {mockCredentials?.map((cred, index) => (
            <div key={index} className="text-xs font-mono">
              <span className="text-primary">{cred?.email}</span> / <span className="text-secondary">{cred?.password}</span>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default LoginForm;