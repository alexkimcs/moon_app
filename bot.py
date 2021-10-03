import krakenex
import json
import time
import datetime
import calendar
import requests

api = krakenex.API()


def get_crypto_data(pair):
	response = float(api.query_public('Ticker', data={'pair': pair})['result'][pair]['a'][0])
	return response


def analyze(pair):
	data = get_crypto_data(pair)

	balance = get_fake_balance()
	last_trade = get_last_trade(pair)

	close_ = float(data)

	if last_trade is None:
		fake_buy(pair, balance, close_)
		return

	last_trade_price = float(last_trade['price'])
	did_sell = False

	try:
		# if we own any of the pair currency that we are looking at then check sell
		selling_point_win = last_trade_price * 1.005
		selling_point_loss = last_trade_price * 0.995

		# selling at a win
		if close_ >= selling_point_win or close_ >= selling_point_win:
			# sell at a profit
			did_sell = True
			fake_sell(pair, coin_held['dollar_amount'], close_)
			return
		elif close_ <= selling_point_loss or close_ <= selling_point_loss:
			# sell at a loss
			did_sell = True
			fake_sell(pair, coin_held['dollar_amount'], close_)
			return
		# else:
		# 	did_sell = True
		# 	fake_sell(pair, coin_held['dollar_amount'], close_)
	except:
		pass

	# logic for if we should buy
	if not did_sell and float(balance) > 0:

		if last_trade_price >= close_:
			available_money = balance
			# buy
			fake_buy(pair, available_money, close_)
			return


def fake_update_balance(dollar_amount, was_sold):
	balance = get_fake_balance()
	new_balance = 0

	if was_sold:
		new_balance = balance + float(dollar_amount)
	else:
		new_balance = balance - float(dollar_amount)

	url = 'http://localhost:8000/users/updatebalance'
	requests.post(url, {
		'user_id': global_user_id,
		'new_balance': new_balance
	})


def fake_buy(pair, dollar_amount, close_):
	cost = dollar_amount
	fee = 0
	order_type = 'buy'
	time_now = datetime.datetime.now().timestamp()
	vol = float(dollar_amount / close_)
	margin = 0

	url = 'http://localhost:8000/botapi/inserttrade'
	request_obj = {
		'pair': pair,
		'time': time_now,
		'trade_type': 'buy',
		'order_type': order_type,
		'price': close_,
		'cost': cost,
		'fee': fee,
		'vol': vol,
		'margin': margin,
		'user_id_id': global_user_id
	}
	requests.post(url, request_obj)
	coin_held['pair'] = pair
	coin_held['vol'] = vol
	coin_held['dollar_amount'] = dollar_amount
	coin_held['total'] += close_ * vol
	fake_update_balance(0, False)


def fake_sell(pair, dollar_amount, close_):
	cost = close_
	fee = 0
	order_type = 'sell'
	time_now = datetime.datetime.now().timestamp()
	vol = float(dollar_amount / close_)
	margin = 0

	url = 'http://localhost:8000/botapi/inserttrade'
	request_obj = {
		'pair': pair,
		'time': time_now,
		'trade_type': 'sell',
		'order_type': order_type,
		'price': close_,
		'cost': cost,
		'fee': fee,
		'vol': vol,
		'margin': margin,
		'user_id_id': global_user_id
	}
	requests.post(url, request_obj)
	coin_held['pair'] = pair
	coin_held['vol'] = vol
	coin_held['dollar_amount'] = dollar_amount
	coin_held['total'] -= close_ * vol
	fake_update_balance(dollar_amount, True)


def get_fake_balance():
	url = 'http://localhost:8000/users/balance'
	request_obj = {
		'user_id': global_user_id,
	}
	cur_balance = 0
	response = requests.post(url, request_obj)
	if response.status_code == 200:
		cur_balance = float(response.text)
	return cur_balance


def get_last_trade(pair):
	url = 'http://localhost:8000/botapi/lasttrade'
	request_obj = {
		'pair': pair,
		'user_id': global_user_id,
	}
	response = requests.post(url, request_obj)
	last_trade = None
	if response.status_code == 200:
		last_trade = json.loads(json.loads(response.text))
	if last_trade is None:
		print(f"No trades were found for user_id {global_user_id} and pair {pair}")
	return last_trade


def date_nix(str_date):
	return calendar.timegm(str_date.timetuple())

def req(start, end, ofs):
	req_data = {
		'type': 'all',
		'trades': 'true',
		'start': str(date_nix(start)),
		'end': str(date_nix(end)),
		'ofs': str(ofs)
	}
	return req_data

def stop():
	bot_running = False
	return True

def go(user_id, pair_, time_in_seconds):
	global bot_running
	bot_running = False
	global global_user_id
	global_user_id = user_id
	global coin_held
	coin_held = {
		'pair': '',
		'vol': 0.0,
		'dollar_amount': 0.0,
		'total': 0.0,
	}
	bot_running = True
	api.load_key('kraken.key')
	pair = pair_
	since = str(int(time.time() - 3600))
	time_start = time.time()
	while bot_running:
		time_now = time.time()
		time_diff = time_now - time_start
		if time_diff >= time_in_seconds:
			current_price = get_crypto_data(pair)
			fake_sell(pair, coin_held['total'], current_price)
			break
		analyze(pair)
		time.sleep(5)
	return True

