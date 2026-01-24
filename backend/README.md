# VibeLend Backend

Modern Enterprise Loan Origination System (LOS) built with FastAPI and SQLModel.

## 🏗️ Structure

```
backend/
├── app/
│   ├── models/
│   │   └── application.py      # SQLModel database models
│   ├── services/
│   │   └── credit_brain.py     # Core lending decision engine
│   └── main.py                  # FastAPI application
└── requirements.txt             # Python dependencies
```

## 🚀 Getting Started

### Installation

1. Create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Server

```bash
# From the backend directory
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## 📋 API Endpoints

### POST /apply
Submit a loan application for evaluation.

**Request Body:**
```json
{
  "name": "John Doe",
  "income": 75000,
  "credit_score": 720,
  "requested_amount": 25000
}
```

**Response:**
```json
{
  "application_id": 1,
  "approved": true,
  "rate": 5.5,
  "message": "Application approved with Prime Rate: Excellent credit score (720)"
}
```

### GET /applications/{application_id}
Retrieve a loan application by ID.

## 🧠 Credit Decision Logic

The `CreditBrain` service implements the following rules:

1. **Credit Score < 550**: Immediate rejection
2. **Credit Score > 700**: Approval with Prime Rate (5.5%)
3. **Requested Amount > Income × 0.35 × 5**: Rejection for High DTI
4. **Otherwise**: Approval with Subprime Rate (12%)

## 🗄️ Database

Currently using SQLite for development (`vibelend.db`). The database is automatically initialized on first run.

### Schema: `loan_applications`

| Column | Type | Description |
|--------|------|-------------|
| id | Integer | Primary key |
| name | String | Applicant's full name |
| income | Float | Annual income |
| score | Integer | Credit score (300-850) |
| requested_amount | Float | Requested loan amount |
| status | String | Application status (approved/rejected) |
| logic_result | String | Decision message from CreditBrain |
| rate | Float | Approved interest rate |

## 🔧 Configuration

- **CORS**: Configured to allow `http://localhost:5173` (frontend)
- **Database**: SQLite (`vibelend.db`)
- **Server**: Uvicorn on port 8000

## 📦 Dependencies

- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI server for FastAPI
- **SQLModel**: SQL database library combining SQLAlchemy and Pydantic
- **Pydantic**: Data validation using Python type annotations
- **psycopg2-binary**: PostgreSQL adapter (for future production use)
