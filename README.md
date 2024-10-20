# Profile Management Application [Go To Live](https://profile-management-two.vercel.app)

This project is a **profile management system** that allows users to create, view, update, and delete their profiles. The application is built using **React**, **TypeScript**, and **Tailwind CSS**, with **Axios** for making API requests and **JSON-server** for simulating a backend.

## Description

- **Create a Profile**: Fill out the profile form with your **First Name**, **Last Name**, **Age**, and **Email**.
- **View Profile**: After submission, you'll be redirected to a profile view page to see the details you entered.
- **Update/Delete Profile**: Return to the form to update or delete the profile as needed.

The project also includes features like **local storage** for persistence and a **theme toggle** (light/dark mode) for a better user experience.

## Technologies Used

- **React** (JavaScript library for building user interfaces)
- **TypeScript** (for type safety and better development experience)
- **Axios** (for making HTTP requests)
- **Tailwind CSS** (for styling)
- **JSON-server** (for simulating a REST API backend)

### Future Enhancements

- **Admin Login**: An admin panel to manage multiple user profiles, with the ability to view, update, or delete user accounts.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HirenLimbasiya/profile-management.git
   ```
2. Navigate into the project directory:
   ```bash
   cd profile-management
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the JSON-server to simulate the backend:
   ```bash
   npm run server
   ```
5. In another terminal, start the React development server:
   ```bash
   npm run dev
   ```
## Production Build [Not Required]
To build the app for production (note: JSON-server is not used in production):
   ```bash
   npm run prod
   ```

# How to Use

1. **Create a Profile**:
   - Navigate to the **Form Page** by clicking on the "Create Profile" link.
   - Fill out the form with the required information such as **First Name**, **Last Name**, **Age**, and **Email**.
   - After submission, you'll be automatically redirected to the **Profile Page** where you can view the saved profile details.

2. **View Profile**:
   - On the **Profile Page**, you'll see the details you just saved, including your **Name**, **Age**, and **Email**.
   - If you want to make changes, you can return to the form page.

3. **Update Profile**:
   - Go back to the **Form Page** from the profile view.
   - Modify any profile field and click the submit button. Your changes will be saved, and you'll be redirected back to the **Profile Page**.

4. **Delete Profile**:
   - On the **Form Page**, you will find a "Delete" button. Clicking this will permanently remove your profile.

5. **Theme Toggle**:
   - Toggle between light and dark modes using the theme switcher located on the top of the page.

## Author

This project is created and maintained by **Hiren Limbasiya**.

For more of my work, you can visit my [Portfolio](https://www.hirenlimbasiya.com/).

Feel free to connect with me for collaboration or any questions!
