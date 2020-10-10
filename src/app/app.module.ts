import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  AccountHttp,
  AccountListener,
  BlockchainListener,
  BlockHttp,
  ChainHttp,
  ConfirmedTransactionListener,
  NamespaceHttp,
  NEMLibrary,
  NetworkTypes,
  NodeHttp,
  TransactionHttp,
  UnconfirmedTransactionListener
} from "nem-library";
import { NgxFileDropModule } from 'ngx-file-drop';

import { BlockchainListenerProvider } from "./providers/BlockchainListenerProvider";
import { UnconfirmedTransactionListenerProvider } from "./providers/UnconfirmedTransactionListenerProvider";
import { AccountHttpProvider } from "./providers/AccountHttpProvider";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountListenerProvider } from "./providers/AccountListenerProvider";
import { BlockHttpProvider } from "./providers/BlockHttpProvider";
import { ChainHttpProvider } from "./providers/ChainHttpProvider";
import { ConfirmedTransactionListenerProvider } from "./providers/ConfirmedTransactionListenerProvider";
import { NamespaceHttpProvider } from "./providers/NamespaceHttpProvider";
import { NodeHttpProvider } from "./providers/NodeHttpProvider";
import { TransactionHttpProvider } from "./providers/TransactionHttpProvider";
import { AppMaterialDesignModule } from './app.material-design.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NavigationComponent } from './main/navigation/navigation.component';
import { FooterComponent } from './main/footer/footer.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ErrorsModule } from './errors/errors.module';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { ProfileModule } from './profile/profile.module';
import { CopyrightModule } from './copyright/copyright.module';
import { PurchaseTokenComponent } from './purchase-token/purchase-token.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionNotificationComponent } from './transaction-notification/transaction-notification.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MAT_DATE_LOCALE } from '@angular/material';

NEMLibrary.bootstrap(NetworkTypes.TEST_NET);
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingPageComponent,
    PurchaseTokenComponent,
    TransactionNotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialDesignModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    AuthenticationModule,
    ErrorsModule,
    ProfileModule,
    CopyrightModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    Ng2TelInputModule
  ],
  entryComponents: [TransactionNotificationComponent],
  providers: [
    { provide: AccountHttp, useFactory: AccountHttpProvider },
    { provide: AccountListener, useFactory: AccountListenerProvider },
    { provide: BlockchainListener, useFactory: BlockchainListenerProvider },
    { provide: BlockHttp, useFactory: BlockHttpProvider },
    { provide: ChainHttp, useFactory: ChainHttpProvider },
    { provide: ConfirmedTransactionListener, useFactory: ConfirmedTransactionListenerProvider },
    { provide: NamespaceHttp, useFactory: NamespaceHttpProvider },
    { provide: NodeHttp, useFactory: NodeHttpProvider },
    { provide: TransactionHttp, useFactory: TransactionHttpProvider },
    { provide: UnconfirmedTransactionListener, useFactory: UnconfirmedTransactionListenerProvider },
    { provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
