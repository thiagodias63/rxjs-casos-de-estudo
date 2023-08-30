/* @Injectable({
    providedIn: 'root',
    useFactory: () => inject(ENVIROMENT).mockBackend 
        ? inject(CustomerMockAdapterService)
        : inject(CustomerAdapterService)
}) 
export abstract class CustomerPortService {
    abstract loadOne(id: string): Observable<Customer>;
    abstract loadAll(): Observable<Customer[]>;
    abstract create(customer: Customer): Observable<Customer>;
    abstract update(id: string, customer: Customer): Observable<Customer>;
}

@Injectable({
    providedIn: 'root'
})
export class CustomerMockAdapterService implements CustomerPortService {
    // implements abstract methods from CustomerPortService
}

@Component({
    selector: 'app-component',
    template: `<span> some template</span>`
    styles: [``]
})
export class AppComponent {
    private readonly customerService = inject(CustoemrPortService);
}
*/
// from ng-journal.com