# Challenge 2

Pseudocode:

```


Function reqDeposit:
    Begin
        - Disable input and buttons, show a loading state
        - Get the amount input by the user
        - Try to:
            1. Send a deposit request to the server with the given amount
            2. Wait for the server to process the deposit
            3. Update the displayed balance with the new balance
            4. Enable input and buttons, hide the loading state
        - If an error occurs, display the error message to the user
    End

Function reqWithdraw:
    Begin
        - Disable input and buttons, show a loading state
        - Get the amount input by the user
        - Try to:
            1. Send a withdrawal request to the server with the given amount
            2. Wait for the server to process the withdrawal
                a. Ensure the user has enough balance
            3. Update the displayed balance with the new balance
            4. Enable input and buttons, hide the loading state
        - If an error occurs, display the error message to the user
    End


Function getSaldo :
    Begin
        - Request the balance from the server
        - Update `saldo` with the new balance
    End


```
