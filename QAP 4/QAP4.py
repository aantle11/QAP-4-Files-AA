# Description: Caculate insurance policy information for customers.
# Author: Alicia Antle
# Date(s): Nov 16th 2024 - Nov 27th, 2024


# Define required libraries.
import datetime
from datetime import datetime, timedelta
import FormatValues as FV


# Define program constants
PolicyNumDSP = 1944
BasicPremDSP = 869.00
DiscRateDSP = 0.25
LiabilityCostDSP = 130.00
GlassCovDSP = 86.00
LoanCarDSP = 58.00
HSTDSP = 0.15
ProcessFeeDSP = 39.99

# Define program functions
def validate_province(province):
    valid_provinces = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"]
    return province.upper() in valid_provinces

# Main program
while True:
    # Gather user inputs
    CustFirstName = input("Enter your First Name: ").title()
    CustLastName = input("Enter your Last Name: ").title()
    Address = input("Enter your Address: ")
    City = input("Enter your City: ").title()
    Province = input("Enter the Province: ").upper()
    while not validate_province(Province):
        print("Invalid province, Please enter a valid province.")
        Province = input("Enter the Province").upper()
    PostCode = input("Enter your Postal Code: ")
    PhoneNum = input("Enter your Phone Number: ")

    NumCarInsur = int(input("Enter the number of cars being insured: "))
    ExtraLia = input("Do you want Extra Liability? (Y for yes, N for No): ").upper()
    OptGlass = input("Do you want Glass Coverage? (Y for yes, N for No): ").upper()
    OptLoanCar = input("Do you want a Loaner Car? (Y for yes, N for No): ").upper()

    # Payment choice
    ValidOptions = ["Full", "Monthly", "Down Pay"]
    PaymentChoice = input("Enter your payment choice (Full, Monthly, or Down Pay): ").title()
    while PaymentChoice not in ValidOptions:
        print("Invalid choice. Please choose from Full, Monthly, or Down Pay.")
        PaymentChoice = input("Enter your payment choice (Full, Monthly, or Down Pay): ").title()
    DownPayment = 0
    if PaymentChoice == "Down Pay":
        while True:
            DownPayment = float(input("Enter the amount for your down payment: "))
            if DownPayment <= 0:
                print("Please enter a positive amount for the down payment.")
            else:
                break

    # Collect claims
    ClaimNumbers, ClaimDates, ClaimAmounts = [], [], []
    while True:
        claim_number = input("Enter the claim number (or type 'done' to stop): ").strip()
        if claim_number.lower() == 'done':
            break
        try:
            claim_date = input("Enter the claim date (YYYY-MM-DD): ").strip()
            claim_amount = float(input("Enter the claim amount: "))
            if claim_amount <= 0:
                raise ValueError("Claim amount must be greater than zero.")
            ClaimNumbers.append(claim_number)
            ClaimDates.append(claim_date)
            ClaimAmounts.append(claim_amount)
        except ValueError as e:
            print(f"Invalid input: {e}")

    # Perform required calculations
    ExtraLiaCost = LiabilityCostDSP * NumCarInsur if ExtraLia == 'Y' else 0
    OptGlassCost = GlassCovDSP * NumCarInsur if OptGlass == 'Y' else 0
    OptLoanCarCost = LoanCarDSP * NumCarInsur if OptLoanCar == 'Y' else 0
    TotExtraCharge = ExtraLiaCost + OptGlassCost + OptLoanCarCost

    InsurancePrem = BasicPremDSP + TotExtraCharge
    TotInsurPrem = InsurancePrem * (1 + HSTDSP)
    RemainingCost = TotInsurPrem - DownPayment
    if RemainingCost < 0:
        print("Downpayment exceeds total cost.")
        break
    TotFinance = RemainingCost + ProcessFeeDSP
    MonthlyPayment = TotFinance / 8

    # Caclulate payment dates
    InvoiceDate = datetime.now()
    FirstPayment = (InvoiceDate.replace(day=28) + timedelta(days=4)).replace(day=1)

    # Display results
    print("INSURANCE RECEIPT")
    print(f"--------------------------------")
    print(f"Customer Name: {CustFirstName} {CustLastName}")
    print(f"Address: {Address}, {City}, {Province}, {PostCode}")
    print(f"Phone Number: {PhoneNum}")
    print(f"Number of Cars Insured: {NumCarInsur}")
    print(f"Extra Liability: {'Yes' if ExtraLia == 'Y' else 'No'}")
    print(f"Glass Coverage: {'Yes' if OptGlass == 'Y' else 'No'}")
    print(f"Loaner Car: {'Yes' if OptLoanCar == 'Y' else 'No'}")
    print(f"Insurance Premium: ${InsurancePrem:.2f}")
    print(f"Total Insurance Premium (with HST): ${TotInsurPrem:.2f}")
    print(f"Down Payment: ${DownPayment:.2f}")
    print(f"Remaining Cost: ${RemainingCost:.2f}")
    print(f"Monthly Payment: ${MonthlyPayment:.2f}")
    print(f"Invoice Date: {InvoiceDate.strftime('%Y-%m-%d')}")
    print(f"First Payment Date: {FirstPayment.strftime('%Y-%m-%d')}")
    print("Claim Details:")
    print("Claim #     Claim Date     Amount")
    print(f"--------------------------------")
    for i in range(len(ClaimNumbers)):
        print(f"{ClaimNumbers[i]:<10} {ClaimDates[i]:<12} ${ClaimAmounts[i]:>10.2f}")