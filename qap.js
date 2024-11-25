// Desc: Create invoices for St. Johns Marina & Yacht Club
// Author: Alicia Antle
// Dates: Nov 16, 2024 - Nov 25th, 2024

// Define program constants.
const COSTEVEN_RATE = 80;
const COSTODD_RATE = 120;
const ALT_MEM_RATE = 5;
const WEEK_SITE_CLEAN_RATE = 50;
const VID_SURV_RATE = 35;
const HST_RATE = 0.15;
const STANDARD_RATE = 75;
const EXE_RATE = 150;

// Define format options for printing.
const cur2Format = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Gather user input.
let CurrentDate = prompt("Enter the current date (YYYY-MM-DD): ");
let SiteNumber = parseInt(prompt("Enter the site number (1-100): "));
let MemberName = prompt("Enter the Member Name: ");
let StreetAdd = prompt("Enter the street address: ");
let City = prompt("Enter the city: ");
let Prov = prompt("Enter the province: ").toUpperCase();
let PostCode = prompt("Enter the postal code: ").toUpperCase();
let PhoneNum = prompt("Enter the phone number: ");
let CellNum = prompt("Enter the cellphone number: ");

let MemType = prompt(
  "Enter the Membership type (S for Standard, E for Executive): ").toUpperCase();
let AltMem = parseInt(prompt("Enter the number of alternative members: "));
let WeekSiteClean = prompt("Do you want weekly site cleaning (Y for yes, N for no): ").toUpperCase();
let VidSurv = prompt("Do you want video surveillance (Y for yes, N for no): ").toUpperCase();

// Calculations
let SiteCharge =
  SiteNumber % 2 === 0
     COSTEVEN_RATE + ALT_MEM_RATE * AltMem
     COSTODD_RATE + ALT_MEM_RATE * AltMem;

let ExtraCharges = 0;

if (WeekSiteClean === "Y") {
  ExtraCharges += WEEK_SITE_CLEAN_RATE;
}

if (VidSurv === "Y") {
  ExtraCharges += VID_SURV_RATE;
}

let SubTotal = SiteCharge + ExtraCharges;
let Taxes = SubTotal * HST_RATE;
let TotalMonthlyCharge = SubTotal + Taxes;

let MonthlyDues = MemType === "S" ? STANDARD_RATE : EXE_RATE;
let TotalMonthlyFees = TotalMonthlyCharge + MonthlyDues;
let TotalYearlyFees = TotalMonthlyFees * 12;
let ProcessingFee = 59.99;
let MonthlyPayment = (TotalYearlyFees + ProcessingFee) / 12;
let CancellationFee = 0.6 * SiteCharge * 12;

// Display the Summary
document.write(`
  <table border="1">
    <tr>
      <th colspan="2" class="centerheader">
        St. John's Marina & Yacht Club<br>Yearly Member Receipt<br>
      </th>
    </tr>
    <tr>
      <td colspan="2">
        <b>Client Name and Address:</b><br>
        &nbsp&nbsp___________________________________________&nbsp&nbsp<br>
        ${MemberName}<br>
        ${StreetAdd}<br> 
        ${City}, ${Prov}, ${PostCode}<br><br>
        <b>Phone:</b> ${PhoneNum} (H) &nbsp;&nbsp;&nbsp; ${CellNum} (C)
      </td>
    </tr>
    <tr>
      <td colspan="2"><b>Site #:</b> ${SiteNumber}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Member type:</b> ${MemType === "S" ? "Standard" : "Executive"}</td>
    </tr>
    <tr>
      <td colspan="2"><b>Alternate members:</b> ${AltMem}<br>
      <b>Weekly site cleaning:</b> ${WeekSiteClean === "Y" ? "Yes" : "No"}<br>
      <b>Video surveillance:</b> ${VidSurv === "Y" ? "Yes" : "No"}
      </td>
    </tr>
    <tr>
      <td colspan="2"><b>Site charges:</b> ${cur2Format.format(SiteCharge)}<br>
      <b>Extra charges:</b> ${cur2Format.format(ExtraCharges)}</td>
    </tr>
    <tr>
      <td colspan="2"><b>Subtotal:</b> ${cur2Format.format(SubTotal)}<br>
      <b>Sales tax (HST):</b> ${cur2Format.format(Taxes)}</td>
    </tr>
    <tr>
      <td colspan="2"><b>Total monthly charges:</b> ${cur2Format.format(TotalMonthlyCharge)}<br>
      <b>Monthly dues:</b> ${cur2Format.format(MonthlyDues)}</td>
    </tr>
    <tr>
      <td colspan="2"><b>Total monthly fees:</b> ${cur2Format.format(TotalMonthlyFees)}<br>
      <b>Total yearly fees:</b> ${cur2Format.format(TotalYearlyFees)}</td>
    </tr>
    <tr>
      <td colspan="2"><b>Monthly payment:</b> ${cur2Format.format(MonthlyPayment)}<br>
      <br>
      &nbsp&nbsp___________________________________________&nbsp&nbsp<br>
      <b>Issued:</b> ${CurrentDate}<br>
      <br>
      <b>HST Reg No:</b> 549-33-5849-47<br>
      <br>
      <b>Cancellation fee:</b> ${cur2Format.format(CancellationFee)}</td>
    </tr>
  </table>
`);

