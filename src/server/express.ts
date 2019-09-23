import * as bodyParser from 'body-parser';
import { Express } from 'express';
import { Server } from 'http';
import * as mongoose from 'mongoose';
import { RegisterController, SprintController } from '../controllers';
import { LoginController } from '../controllers';
import { NoteController } from '../controllers/note';

export class ExpressServer {
    public httpServer: Server;
    private _baseApiUrl = '/api/v1/';
    private _registerRoute: RegisterController;
    private _loginRoute: LoginController;
    private _sprintRoute: SprintController;
    private _noteRoute: NoteController;

    constructor(server: Express, port: number) {
      this.setupStandardMiddleware(server);
      this._registerRoute = new RegisterController(server);
      this._loginRoute = new LoginController(server);
      this._sprintRoute = new SprintController(server);
      this._noteRoute = new NoteController(server);
      this.configureApiEndPoints();
      this.httpServer = this.startListen(server, port);
    }

    public startListen(server: Express, port: number): Server {
      return server.listen(port);
    }

    public connectDB(uri: string) {
      mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
      return mongoose;
    }

    private setupStandardMiddleware(server: Express) {
        server.use(bodyParser.json());

        server.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
              'Access-Control-Allow-Headers',
              'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
          });
    }

    private configureApiEndPoints() {
      this._registerRoute.initialize(this._baseApiUrl);
      this._loginRoute.initialize(this._baseApiUrl);
      this._sprintRoute.initialize(this._baseApiUrl);
      this._noteRoute.initialize(this._baseApiUrl);
    }

}