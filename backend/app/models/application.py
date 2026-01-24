"""
Database models for VibeLend loan applications
"""
from typing import Optional
from sqlmodel import Field, SQLModel


class LoanApplication(SQLModel, table=True):
    """
    Loan application database model storing applicant information and decision results.
    """
    __tablename__ = "loan_applications"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, description="Applicant's full name")
    income: float = Field(description="Annual income in dollars")
    score: int = Field(description="Credit score (300-850)")
    requested_amount: float = Field(description="Requested loan amount")
    status: str = Field(max_length=50, description="Application status (approved/rejected)")
    logic_result: str = Field(description="Decision message from CreditBrain")
    rate: float = Field(default=0.0, description="Approved interest rate (if applicable)")
