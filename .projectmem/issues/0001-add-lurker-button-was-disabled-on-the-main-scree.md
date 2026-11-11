# #0001 Add lurker button was disabled on the main screen because it required an active tab without an existing lurker record.

- 2026-11-10T23:38:25Z `issue`: Add lurker button was disabled on the main screen because it required an active tab without an existing lurker record. [src/popup/screens/MainScreen.tsx]
- 2026-11-10T23:38:26Z `fix`: Removed the disabled condition; the create form defaults New tab on and can start a lurker even when the current tab is already managed. Submit guard only requires a tab when New tab is unchecked. [src/popup/screens/MainScreen.tsx,src/popup/screens/LurkerFormScreen.tsx]
