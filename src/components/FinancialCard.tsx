import { FinancialRecord } from '../lib/supabase'

interface Props {
  financial: FinancialRecord | null
}

export default function FinancialCard({ financial }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="icon">💳</span>
        <div>
          <h3>Fee Payment</h3>
          <p className="card-subtitle">Financial summary</p>
        </div>
      </div>
      
      <div className="fee-credit-box">
        <div className="fee-credit-header">
          <span className="check-icon">✓</span>
          <span>Fee Credit</span>
        </div>
        <div className="fee-amount">
          Ksh. {financial?.credit_balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
        </div>
        <p className="fee-note">You have a credit balance</p>
      </div>
      
      <div className="fee-summary">
        <div className="fee-row">
          <span>Total Billed</span>
          <span>Ksh. {financial?.total_billed.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}</span>
        </div>
        <div className="fee-row">
          <span>Total Paid</span>
          <span className="green-text">
            Ksh. {financial?.total_paid.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'}
          </span>
        </div>
      </div>
      
      <button className="paid-btn">💳 Already Paid</button>
      
      <div className="card-footer-tabs">
        <button className="tab-btn active">📄 Statements</button>
        <button className="tab-btn">🧾 Receipts</button>
      </div>
    </div>
  )
}
