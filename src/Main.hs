{-# LANGUAGE FlexibleContexts, OverloadedStrings, DeriveGeneric, DeriveAnyClass #-}
module Main (main) where

import Network.N2O
import Network.N2O.Web hiding (Event)
import GHC.Generics (Generic)
import Data.Serialize (Serialize)
import Data.Text.Encoding (decodeUtf8)

data Example = Greet deriving (Show, Eq, Generic, Serialize)

main = runServer "localhost" 3000 cx

cx :: Cx Example
cx = mkCx{ cxMiddleware=[router]
         , cxProtos = [nitroProto]
         }

router cx@Context{cxReq=Req{reqPath=path}} =
  let handle = case path of
                  "/ws/samples/static/index.html" -> index
                  "/ws/samples/static/about.html" -> about
                  _ -> index
  in cx{cxHandler=mkHandler handle}

index Init = do
  sub "room"
  --updateText "system" "What is your name?"
  wire button{id_="send", postback=Just Greet, source=["name"]}
index (Message Greet) = do
  Just x <- get "name" -- wf:q/1
  insertBottom "system" ([panel{body = [literal{text = decodeUtf8 x}]}] :: [Element Example])
  --updateText "system" ("Hello, " <> jsEscape x <> "!")
index Terminate = unsub "room"
about Init = updateText "app" "This is the N2O Hello World App"
about ev = liftIO $ putStrLn ("Unknown event " <> show ev)
