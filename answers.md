# What good practices do you see that you would reuse on other NestJS projects
* The structure project aligns with the principles of Nest framework , it separatess business logic, infrastructure and presentation which facilitates maintenance and scalability
* The use of modules : I find that the use of NestJS modules is usefull. Each module should have a clear responsibility and should be independent
* Dependency Injection: The Use of decorators like @Injectable(),@Module,@ApiProperty,... to inject services, repositories, or other dependencies into components is a good practise. It allows to take advantage of NestJS's built-in dependency injection system.
* Middleware: The use of middleware for cross-cutting concerns. Middleware functions is be used for tasks like logging, authentication (jwt)
* Protection route with guards and interceptors for handling cross-cutting concerns globally. They help in separating concerns and keeping the codebase clean.
* Swagger helps users who join project later to understand it quickly,it generates interactive and easy-to-read API documentation directly from the code. Also, it allows developers to test API endpoints directly from the documentation
* Prisma : facilitates database access and management, allowing developers to focus more on application logic rather than dealing with complex SQL queries
it includes support for database allowing you to evolve database schema over time. This is crucial for maintaining the integrity of data as the application evolves. 
* The integration of ESlint, End-to-End Testing, versionning with git, the use drone in CI/CD all these practises contribute to the success of the pipeline CI/CD 
* Environment variable are not hard-coded which is necessary for the security of the application

# What would you refactor in the code to improve its **quality** ?

* Put the services code in use-case package to suit to the clean architecture
* use caching : it is a great and simple technique that helps improve app's performance. It acts as a temporary data store providing high performance data access.
* Handling exceptions is a crucial aspect to ensure the robustness and quality of the application, which is not provided. We can use Exception filters or  customize the handling based on the type of exception
* Commenting code can contribute to improving the quality of the application 

# What would you bring to improve the **CI/CD** (in order to reduce the number of bugs in prod) ?<br/>
To improve it, we can test the application using  
* drone command in a local build file : we should mention this line    
under image => **pull : if-not-exists**  
=>to tell the drone to use container's built locally
under settings  
**log_level : debug**  
=>we can introspect what it is happening inside of a drone build whenver it does'nt work
and then we run this command  
**docker exec --debug**
* drone runner with this command :
**drone exec2 .drone.yml --debug**  
=>we can see in the terminal, among the huge json information ( environment variables,..)

# What would you do to improve the **DevX** ?
* Logger :  helps developers troubleshoot and debug issues by providing detailed information about the application's behavior, execution flow, and variable values.
* Integrate live reload tools into the development environment : it allow developper to see the immediate impact of code changes without manually restarting the application or refreshing the browser 


# What would you do to improve the **security** of the application ?
* File **auth.module.ts** :
"jwtSecret" should be declared as an environment variable for better security 
* Shorter expiration times can enhance security by limiting the opportunity for an attacker to misuse a compromised token and also require users to reauthenticate more frequently.
we can put  
**imports: [  
PrismaModule,  
PassportModule,  
JwtModule.register({  
secret: process.env.JWT_SECRET,  
signOptions: { expiresIn: "1h" },  
}),
],**  
    with adding JWT_SECRET in .env file

* Password user must be crypted
password should never be stored in plain text, we can use strong and secure hashing algorithms ( bcrypt, ..). Also, we can imploy salting 

    
# If you had to add a Commenting feature on articles, how would you do it ? (Do not hesitate to write code !)<br/>

To add a commenting feature on articles :
* Change schema.prisma : add comment model and foreign key to article and user
* npm run migrate --name "add_command_model" to update changments in database ( we store changement in file under migration folder) 
* Generate resource to establish the crud 
* Add store data in seed.ts to test 
* Configure application (swagger, controller, module, service) 
* Test application : localhost:3000/api
* Use log messages (it serves as documentation, test and debug)
