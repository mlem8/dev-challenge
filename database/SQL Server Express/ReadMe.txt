SQL Server Express 2012 Install: http://www.microsoft.com/en-us/sqlserver/editions/2012-editions/express.aspx

3 Options to Create Database:
    
    Restore (\Backup\Titles.bak): http://technet.microsoft.com/en-us/library/ms177429.aspx

    Attach (\DATA\Titles.mdf,\DATA\Titles.ldf): http://technet.microsoft.com/en-us/library/ms190794.aspx
    
    Script (\Script\Titles.sql)


    Note: If using Restore or Attach, you will need to do one of the following to avoid permission issues: 

        1) Copy the file(s) to the appropriate SQL Express directory (C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\...)
    
        2) Grant the User that SQL Express is running under rights to the file(s). Use SQL Server Configuration Manager to find the User.

        