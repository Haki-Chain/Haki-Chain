"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  CreditCard,
  Wallet,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Coins,
  ArrowRight,
  ShieldCheck,
  Info,
  TrendingUp,
  BarChart3,
  Clock,
} from "lucide-react"

// Mock data for token packages
const tokenPackages = [
  {
    id: "basic",
    name: "Basic",
    amount: 100,
    price: 10,
    popular: false,
    description: "Perfect for small donations and getting started",
  },
  {
    id: "standard",
    name: "Standard",
    amount: 500,
    price: 45,
    popular: true,
    description: "Most popular choice for regular contributors",
    discount: "10% off",
  },
  {
    id: "premium",
    name: "Premium",
    amount: 1000,
    price: 85,
    popular: false,
    description: "Best value for active supporters",
    discount: "15% off",
  },
  {
    id: "custom",
    name: "Custom",
    amount: 0,
    price: 0,
    popular: false,
    description: "Choose your own token amount",
  },
]

// Mock data for token stats
const tokenStats = {
  currentPrice: 0.09,
  priceChange: 5.2,
  priceChangePositive: true,
  marketCap: 2500000,
  totalSupply: 30000000,
  circulatingSupply: 15000000,
  tokenSymbol: "HAKI",
  tokenName: "HakiChain Token",
}

// Mock data for token price history
const priceHistory = [
  { date: "Jan", price: 0.05 },
  { date: "Feb", price: 0.06 },
  { date: "Mar", price: 0.055 },
  { date: "Apr", price: 0.07 },
  { date: "May", price: 0.065 },
  { date: "Jun", price: 0.08 },
  { date: "Jul", price: 0.075 },
  { date: "Aug", price: 0.085 },
  { date: "Sep", price: 0.09 },
]

export default function TokenMarketplacePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("buy")
  const [selectedPackage, setSelectedPackage] = useState(tokenPackages[1].id)
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [sellAmount, setSellAmount] = useState("")

  const handleBuyTokens = () => {
    if (selectedPackage === "custom" && (!customAmount || Number.parseFloat(customAmount) <= 0)) {
      setErrorMessage("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
    }, 2000)
  }

  const handleSellTokens = () => {
    if (!sellAmount || Number.parseFloat(sellAmount) <= 0) {
      setErrorMessage("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
    }, 2000)
  }

  const getPackageAmount = () => {
    if (selectedPackage === "custom") {
      return customAmount ? Number.parseFloat(customAmount) : 0
    }

    const pkg = tokenPackages.find((p) => p.id === selectedPackage)
    return pkg ? pkg.amount : 0
  }

  const getPackagePrice = () => {
    if (selectedPackage === "custom") {
      return customAmount ? Number.parseFloat(customAmount) * tokenStats.currentPrice : 0
    }

    const pkg = tokenPackages.find((p) => p.id === selectedPackage)
    return pkg ? pkg.price : 0
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access the token marketplace.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="/login">Go to Login</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Token Marketplace.</h1>
          <p className="text-muted-foreground mt-1">Buy and sell HAKI tokens to support legal bounties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{tokenStats.tokenName}</CardTitle>
                  <CardDescription>
                    {tokenStats.tokenSymbol} • Current Price: {formatCurrency(tokenStats.currentPrice)}
                  </CardDescription>
                </div>
                <Badge className={tokenStats.priceChangePositive ? "bg-green-500" : "bg-red-500"}>
                  {tokenStats.priceChangePositive ? "+" : "-"}
                  {tokenStats.priceChange}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-muted/30 rounded-md flex items-center justify-center mb-4">
                <BarChart3 className="h-24 w-24 text-muted-foreground/50" />
                <span className="sr-only">Price chart</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="font-medium">{formatCurrency(tokenStats.marketCap)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Supply</div>
                  <div className="font-medium">{formatNumber(tokenStats.totalSupply)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Circulating Supply</div>
                  <div className="font-medium">{formatNumber(tokenStats.circulatingSupply)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Token Type</div>
                  <div className="font-medium">HTS</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy Tokens</TabsTrigger>
              <TabsTrigger value="sell">Sell Tokens</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="mt-6 space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tokenPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`cursor-pointer transition-all ${selectedPackage === pkg.id ? "border-primary ring-1 ring-primary" : ""}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <CardHeader className="pb-2 relative">
                      {pkg.popular && <Badge className="absolute top-2 right-2">Popular</Badge>}
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      {pkg.id !== "custom" && (
                        <CardDescription>
                          {pkg.amount} {tokenStats.tokenSymbol}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {pkg.id === "custom" ? (
                        <div className="space-y-2">
                          <Label htmlFor="custom-amount">Amount</Label>
                          <Input
                            id="custom-amount"
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      ) : (
                        <>
                          <div className="text-2xl font-bold">{formatCurrency(pkg.price)}</div>
                          <div className="text-sm text-muted-foreground">
                            {pkg.discount && <span className="text-green-500 mr-2">{pkg.discount}</span>}
                            {pkg.description}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center">
                        <Wallet className="mr-2 h-4 w-4" />
                        Crypto Wallet
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <div className="w-full space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>
                        {getPackageAmount()} {tokenStats.tokenSymbol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per token:</span>
                      <span>{formatCurrency(tokenStats.currentPrice)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>{formatCurrency(getPackagePrice())}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleBuyTokens}
                    disabled={
                      isLoading ||
                      (selectedPackage === "custom" && (!customAmount || Number.parseFloat(customAmount) <= 0))
                    }
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Buy Tokens
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="sell" className="mt-6 space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Sell Tokens</CardTitle>
                  <CardDescription>Convert your HAKI tokens back to USD</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="sell-amount">Amount to Sell</Label>
                      <span className="text-sm text-muted-foreground">Balance: 1,250 {tokenStats.tokenSymbol}</span>
                    </div>
                    <div className="relative">
                      <Input
                        id="sell-amount"
                        type="number"
                        placeholder="0.00"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-muted-foreground">{tokenStats.tokenSymbol}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>You'll Receive</Label>
                    <div className="p-3 bg-muted/50 rounded-md">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>
                          {sellAmount ? Number.parseFloat(sellAmount) : 0} {tokenStats.tokenSymbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span>{formatCurrency(tokenStats.currentPrice)} per token</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>
                          {formatCurrency(sellAmount ? Number.parseFloat(sellAmount) * tokenStats.currentPrice : 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                    <div className="flex">
                      <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          Selling tokens may take 1-2 business days to process. Funds will be sent to your connected
                          payment method.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handleSellTokens}
                    disabled={isLoading || !sellAmount || Number.parseFloat(sellAmount) <= 0}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Sell Tokens
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex">
                <div className="mr-4 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Support Legal Justice</h3>
                  <p className="text-sm text-muted-foreground">Fund important legal cases and help those in need</p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Potential Growth</h3>
                  <p className="text-sm text-muted-foreground">Token value may increase as the platform grows</p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Staking Rewards</h3>
                  <p className="text-sm text-muted-foreground">Earn additional tokens by staking your holdings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </div>
                  <h3 className="font-medium">Buy HAKI tokens</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-9">Purchase tokens using credit card or crypto</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </div>
                  <h3 className="font-medium">Support legal bounties</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-9">Use tokens to fund important legal cases</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">
                    3
                  </div>
                  <h3 className="font-medium">Track your impact</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-9">See how your contributions help achieve justice</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/faq">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Submitted</DialogTitle>
            <DialogDescription>Your transaction has been submitted and is being processed.</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {activeTab === "buy" ? "Purchase Successful" : "Sale Submitted"}
            </h3>
            <p className="text-muted-foreground">
              {activeTab === "buy"
                ? `You've purchased ${getPackageAmount()} ${tokenStats.tokenSymbol} tokens`
                : `You've sold ${sellAmount} ${tokenStats.tokenSymbol} tokens`}
            </p>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {activeTab === "buy"
                  ? "Tokens will be added to your wallet shortly"
                  : "Funds will be sent to your account in 1-2 business days"}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSuccess(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

