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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Plus,
  ExternalLink,
  DollarSign,
  Coins,
} from "lucide-react"

// Mock data for wallet
const walletData = {
  connected: false,
  address: "0x1234...5678",
  balance: 1250,
  tokenSymbol: "HAKI",
  transactions: [
    {
      id: "tx1",
      type: "receive",
      amount: 500,
      from: "0xabcd...efgh",
      to: "0x1234...5678",
      timestamp: "2023-10-05T14:30:00Z",
      status: "completed",
      description: "Bounty reward payment",
    },
    {
      id: "tx2",
      type: "send",
      amount: 250,
      from: "0x1234...5678",
      to: "0xijkl...mnop",
      timestamp: "2023-10-03T09:15:00Z",
      status: "completed",
      description: "Donation to Land Rights Case",
    },
    {
      id: "tx3",
      type: "receive",
      amount: 1000,
      from: "0xqrst...uvwx",
      to: "0x1234...5678",
      timestamp: "2023-09-28T16:45:00Z",
      status: "completed",
      description: "Token purchase",
    },
    {
      id: "tx4",
      type: "send",
      amount: 100,
      from: "0x1234...5678",
      to: "0xyzab...cdef",
      timestamp: "2023-09-25T11:20:00Z",
      status: "pending",
      description: "Donation to Asylum Seekers Legal Support",
    },
  ],
  stakingBalance: 500,
  stakingRewards: 25,
  stakingApr: 12.5,
}

// Mock data for bounties funded by the user
const fundedBounties = [
  {
    id: "1",
    title: "Land Rights Case for Indigenous Community",
    ngo: {
      name: "Amazon Defenders Coalition",
      logo: "/placeholder.svg?height=40&width=40",
    },
    amountDonated: 250,
    status: "active",
    progress: 65,
  },
  {
    id: "2",
    title: "Asylum Seekers Legal Support",
    ngo: {
      name: "Refugee Rights Initiative",
      logo: "/placeholder.svg?height=40&width=40",
    },
    amountDonated: 100,
    status: "pending",
    progress: 80,
  },
]

export default function WalletPage() {
  const { user } = useAuth()
  const [isConnected, setIsConnected] = useState(walletData.connected)
  const [walletAddress, setWalletAddress] = useState(walletData.address)
  const [balance, setBalance] = useState(walletData.balance)
  const [transactions, setTransactions] = useState(walletData.transactions)
  const [activeTab, setActiveTab] = useState("overview")
  const [sendAmount, setSendAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [isAddressCopied, setIsAddressCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleConnectWallet = () => {
    setIsLoading(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleDisconnectWallet = () => {
    setIsConnected(false)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setIsAddressCopied(true)

    setTimeout(() => {
      setIsAddressCopied(false)
    }, 2000)
  }

  const handleSendTokens = () => {
    if (!sendAmount || Number.parseFloat(sendAmount) <= 0) {
      setErrorMessage("Please enter a valid amount")
      return
    }

    if (!recipientAddress) {
      setErrorMessage("Please enter a recipient address")
      return
    }

    if (Number.parseFloat(sendAmount) > balance) {
      setErrorMessage("Insufficient balance")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)

      // Update balance and add transaction
      const amount = Number.parseFloat(sendAmount)
      setBalance((prevBalance) => prevBalance - amount)

      const newTransaction = {
        id: `tx${transactions.length + 1}`,
        type: "send",
        amount: amount,
        from: walletAddress,
        to: recipientAddress,
        timestamp: new Date().toISOString(),
        status: "pending",
        description: "Token transfer",
      }

      setTransactions((prev) => [newTransaction, ...prev])
      setSendAmount("")
      setRecipientAddress("")
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access your wallet.</CardDescription>
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
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

      {!isConnected ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your blockchain wallet to access HakiChain features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-md">
              <p className="text-sm text-muted-foreground">By connecting your wallet, you'll be able to:</p>
              <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                <li>Receive and send HAKI tokens</li>
                <li>Donate to legal bounties</li>
                <li>Earn rewards through staking</li>
                <li>Track your contributions and impact</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConnectWallet} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{balance.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{walletData.tokenSymbol} Tokens</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/marketplace">
                    <Plus className="mr-2 h-4 w-4" />
                    Buy More Tokens
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Staking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">{walletData.stakingBalance.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Staked {walletData.tokenSymbol}</div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-green-500">
                    +{walletData.stakingRewards} {walletData.tokenSymbol}
                  </span>
                  <span className="text-muted-foreground ml-2">Rewards earned</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{walletData.stakingApr}% APR</div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  Manage Staking
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Wallet Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm bg-muted p-2 rounded-md w-full overflow-hidden">
                    {walletAddress}
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopyAddress} className="ml-2 flex-shrink-0">
                    {isAddressCopied ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy address</span>
                  </Button>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">Connected to Hedera Testnet</div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-500 hover:text-red-600"
                  onClick={handleDisconnectWallet}
                >
                  Disconnect Wallet
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="send">Send Tokens</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {transactions.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === "receive" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}
                        >
                          {tx.type === "receive" ? (
                            <ArrowDownLeft
                              className={`h-4 w-4 ${tx.type === "receive" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
                            />
                          ) : (
                            <ArrowUpRight
                              className={`h-4 w-4 ${tx.type === "receive" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
                            />
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">
                            {tx.type === "receive" ? "Received" : "Sent"} {walletData.tokenSymbol}
                          </div>
                          <div className="text-xs text-muted-foreground">{formatDate(tx.timestamp)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-medium ${tx.type === "receive" ? "text-green-600 dark:text-green-400" : ""}`}
                        >
                          {tx.type === "receive" ? "+" : "-"}
                          {tx.amount} {walletData.tokenSymbol}
                        </div>
                        <div className="flex items-center justify-end mt-1">
                          <div className={`w-2 h-2 rounded-full ${getTransactionStatusColor(tx.status)}`}></div>
                          <span className="text-xs text-muted-foreground ml-1 capitalize">{tx.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("history")}>
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Funded Bounties</CardTitle>
                </CardHeader>
                <CardContent>
                  {fundedBounties.length > 0 ? (
                    <div className="space-y-4">
                      {fundedBounties.map((bounty) => (
                        <div key={bounty.id} className="flex items-start justify-between">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={bounty.ngo.logo} alt={bounty.ngo.name} />
                              <AvatarFallback>{bounty.ngo.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{bounty.title}</div>
                              <div className="text-sm text-muted-foreground">{bounty.ngo.name}</div>
                              <div className="mt-1">
                                <Badge variant={bounty.status === "active" ? "default" : "outline"}>
                                  {bounty.status === "active" ? "Active" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {bounty.amountDonated} {walletData.tokenSymbol}
                            </div>
                            <div className="w-24 mt-1">
                              <div className="text-xs text-muted-foreground mb-1 text-right">
                                {bounty.progress}% Funded
                              </div>
                              <Progress value={bounty.progress} className="h-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">You haven't funded any bounties yet</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <a href="/bounties">Browse Bounties</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="send" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Tokens</CardTitle>
                  <CardDescription>Transfer HAKI tokens to another wallet or donate to a bounty</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {errorMessage && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="amount">Amount</Label>
                      <span className="text-sm text-muted-foreground">
                        Balance: {balance} {walletData.tokenSymbol}
                      </span>
                    </div>
                    <div className="relative">
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="pr-16"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-muted-foreground">{walletData.tokenSymbol}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button onClick={handleSendTokens} disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Send Tokens
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transaction Submitted</DialogTitle>
                    <DialogDescription>Your transaction has been submitted to the network.</DialogDescription>
                  </DialogHeader>
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Transaction Pending</h3>
                    <p className="text-muted-foreground">
                      You've sent {sendAmount} {walletData.tokenSymbol} to {recipientAddress.substring(0, 6)}...
                      {recipientAddress.substring(recipientAddress.length - 4)}
                    </p>
                    <div className="flex items-center mt-4 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>This may take a few minutes to process</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setShowSuccess(false)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                          <div className="flex items-start">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "receive" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}
                            >
                              {tx.type === "receive" ? (
                                <ArrowDownLeft
                                  className={`h-5 w-5 ${tx.type === "receive" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
                                />
                              ) : (
                                <ArrowUpRight
                                  className={`h-5 w-5 ${tx.type === "receive" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
                                />
                              )}
                            </div>
                            <div className="ml-3">
                              <div className="font-medium">
                                {tx.description ||
                                  (tx.type === "receive" ? "Received" : "Sent") + " " + walletData.tokenSymbol}
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(tx.timestamp)}</div>
                              <div className="mt-1 text-xs">
                                {tx.type === "receive" ? <span>From: {tx.from}</span> : <span>To: {tx.to}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-medium ${tx.type === "receive" ? "text-green-600 dark:text-green-400" : ""}`}
                            >
                              {tx.type === "receive" ? "+" : "-"}
                              {tx.amount} {walletData.tokenSymbol}
                            </div>
                            <div className="flex items-center justify-end mt-1">
                              <div className={`w-2 h-2 rounded-full ${getTransactionStatusColor(tx.status)}`}></div>
                              <span className="text-xs text-muted-foreground ml-1 capitalize">{tx.status}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                            >
                              View on Explorer <ExternalLink className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No transactions yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

