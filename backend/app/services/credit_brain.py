"""
Credit Brain Service - Core lending decision engine for VibeLend
"""
from pydantic import BaseModel


class CreditDecision(BaseModel):
    """Model representing a credit decision response"""
    approved: bool
    rate: float
    message: str


class CreditBrain:
    """
    Core credit decision engine implementing VibeLend's lending criteria.
    
    Decision Rules:
    - Credit score < 550: Immediate rejection
    - Credit score > 700: Approval with Prime Rate (5.5%)
    - Requested amount > income * 0.35 * 5: Rejection for High DTI
    - Otherwise: Approval with Subprime Rate (12%)
    """
    
    PRIME_RATE = 5.5
    SUBPRIME_RATE = 12.0
    MIN_REJECT_SCORE = 550
    PRIME_SCORE_THRESHOLD = 700
    DTI_MULTIPLIER = 0.35
    DTI_YEARS = 5
    
    def evaluate(
        self, 
        credit_score: int, 
        income: float, 
        requested_amount: float
    ) -> CreditDecision:
        """
        Evaluate a loan application based on credit score, income, and requested amount.
        
        Args:
            credit_score: Applicant's credit score (300-850)
            income: Applicant's annual income
            requested_amount: Requested loan amount
            
        Returns:
            CreditDecision with approval status, rate, and message
        """
        # Rule 1: Immediate rejection for poor credit
        if credit_score < self.MIN_REJECT_SCORE:
            return CreditDecision(
                approved=False,
                rate=0.0,
                message=f"Application rejected: Credit score ({credit_score}) below minimum threshold ({self.MIN_REJECT_SCORE})"
            )
        
        # Rule 2: Prime rate for excellent credit
        if credit_score > self.PRIME_SCORE_THRESHOLD:
            return CreditDecision(
                approved=True,
                rate=self.PRIME_RATE,
                message=f"Application approved with Prime Rate: Excellent credit score ({credit_score})"
            )
        
        # Rule 3: Check Debt-to-Income ratio
        max_loan_amount = income * self.DTI_MULTIPLIER * self.DTI_YEARS
        if requested_amount > max_loan_amount:
            return CreditDecision(
                approved=False,
                rate=0.0,
                message=f"Application rejected: High DTI - Requested amount (${requested_amount:,.2f}) exceeds maximum allowed (${max_loan_amount:,.2f})"
            )
        
        # Rule 4: Default to subprime rate for acceptable credit
        return CreditDecision(
            approved=True,
            rate=self.SUBPRIME_RATE,
            message=f"Application approved with Subprime Rate: Credit score ({credit_score}) meets minimum requirements"
        )
