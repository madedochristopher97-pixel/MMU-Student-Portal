import { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function ResetPasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    // Simulate password reset
    setTimeout(() => {
      alert('Password reset successful! You will be logged out from all devices.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
        <p className="text-base text-slate-600">Update your account password</p>
      </div>

      {/* Password Change Form */}
      <Card className="bg-white border-slate-200 shadow-md overflow-hidden max-w-2xl">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-green-700" />
            <h3 className="text-lg font-semibold text-green-900">CHANGE PASSWORD</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Old Password */}
          <div className="space-y-2">
            <Label htmlFor="old-password" className="text-slate-700 font-semibold">
              Old Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="old-password"
                type={showOldPassword ? 'text' : 'password'}
                placeholder="Enter your current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="pr-10 bg-slate-50 border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-slate-700 font-semibold">
              New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pr-10 bg-slate-50 border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-slate-700 font-semibold">
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10 bg-slate-50 border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-900">
              <strong className="font-semibold">Security Notice:</strong> After changing your password, you will be logged out from all devices. You'll need to log in again using your new password.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Lock className="w-4 h-4 mr-2" />
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      {/* Password Requirements */}
      <Card className="bg-blue-50 border-blue-200 p-6 max-w-2xl">
        <h4 className="text-blue-900 font-semibold mb-3">Password Requirements</h4>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>• Must be at least 8 characters long</li>
          <li>• Should contain a mix of uppercase and lowercase letters</li>
          <li>• Include at least one number</li>
          <li>• Consider using special characters for added security</li>
          <li>• Avoid using common words or personal information</li>
        </ul>
      </Card>
    </div>
  );
}
