"""
VibeLend - Modern Enterprise Loan Origination System
FastAPI backend application
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import SQLModel, Session, create_engine

from app.models.application import LoanApplication
from app.services.credit_brain import CreditBrain


# Initialize FastAPI app
app = FastAPI(
    title="VibeLend API",
    description="Modern Enterprise Loan Origination System",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup (SQLite for development)
DATABASE_URL = "sqlite:///./vibelend.db"
engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)


# Initialize database on startup
@app.on_event("startup")
def on_startup():
    init_db()


# Request/Response models
class LoanApplicationRequest(BaseModel):
    """Request model for loan application submission"""
    name: str
    income: float
    credit_score: int
    requested_amount: float


class LoanApplicationResponse(BaseModel):
    """Response model for loan application decision"""
    application_id: int
    approved: bool
    rate: float
    message: str


# Initialize Credit Brain
credit_brain = CreditBrain()


@app.get("/")
def read_root():
    """Health check endpoint"""
    return {
        "service": "VibeLend API",
        "status": "operational",
        "version": "1.0.0"
    }


@app.post("/apply", response_model=LoanApplicationResponse)
def submit_application(application: LoanApplicationRequest):
    """
    Submit a loan application for evaluation.
    
    The application is processed through the CreditBrain decision engine,
    stored in the database, and a decision is returned.
    
    Args:
        application: Loan application data including name, income, credit score, and requested amount
        
    Returns:
        LoanApplicationResponse with approval status, rate, and message
    """
    try:
        # Run application through CreditBrain
        decision = credit_brain.evaluate(
            credit_score=application.credit_score,
            income=application.income,
            requested_amount=application.requested_amount
        )
        
        # Create database record
        db_application = LoanApplication(
            name=application.name,
            income=application.income,
            score=application.credit_score,
            requested_amount=application.requested_amount,
            status="approved" if decision.approved else "rejected",
            logic_result=decision.message,
            rate=decision.rate
        )
        
        # Save to database
        with Session(engine) as session:
            session.add(db_application)
            session.commit()
            session.refresh(db_application)
            
            return LoanApplicationResponse(
                application_id=db_application.id,
                approved=decision.approved,
                rate=decision.rate,
                message=decision.message
            )
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing application: {str(e)}"
        )


@app.get("/applications/{application_id}")
def get_application(application_id: int):
    """Retrieve a loan application by ID"""
    with Session(engine) as session:
        application = session.get(LoanApplication, application_id)
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")
        return application


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
