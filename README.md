# BMS Playwright 

Test automation of BMS using Playwright

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bms-e2e-playwright
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add .env file to specify the test parameters**
   ```bash
   # The target server
   BASE_URL=https://bms-centos-1.leafnode.io
    # Login credentials for logging in the target server
   TEST_USERNAME=username
   TEST_PASSWORD=password
    # The BMS version that will be used to verify the installed version in the target server
   TEST_BMS_VERSION=30.2
   ```
   
4. **Run the tests:**
   To execute the tests "headless by default", use the following command:
   ```bash
   npx playwright test
   ```

5. **Open Playwright Test Report (after execution):**
   ```bash
   npx playwright show-report
   ```

